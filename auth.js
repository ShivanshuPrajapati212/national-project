
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account, profile }) {
            if (account.provider === 'google') {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: 'new',
                        });
                    }
                    return true;
                } catch (error) {
                    console.error('Error in signIn callback:', error);
                    return false;
                }
            }
            return true;
        },
        async session({ session }) {
            if (session.user) {
                try {
                    await dbConnect();
                    const dbUser = await User.findOne({ email: session.user.email });
                    if (dbUser) {
                        session.user.id = dbUser._id.toString();
                        session.user.role = dbUser.role;
                        session.user.class = dbUser.class;
                        session.user.section = dbUser.section;
                    }
                } catch (error) {
                    console.error('Error fetching user for session:', error);
                }
            }
            return session;
        },
    },
});
