
import Google from 'next-auth/providers/google';

export const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // Authorized callback is used by the Middleware
        authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const nextUrl = request.nextUrl;
            const isOnDashboard = nextUrl.pathname.startsWith('/feed') || nextUrl.pathname.startsWith('/calendar');
            const isOnLogin = nextUrl.pathname.startsWith('/login');

            if (isLoggedIn && auth.user.role === 'new' && !nextUrl.pathname.startsWith('/onboarding')) {
                return Response.redirect(new URL('/onboarding', nextUrl));
            }

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            if (isOnLogin) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/feed', nextUrl));
                }
                return true;
            }
            return true;
        },
    },
};
