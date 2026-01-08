
'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData) {
    const session = await auth();
    if (!session?.user?.email) return;

    const role = formData.get('role');
    const studentClass = formData.get('class');
    const section = formData.get('section');

    if (!['student', 'teacher', 'parent'].includes(role)) {
        throw new Error('Invalid role');
    }

    await dbConnect();

    const updateData = { role };
    if (role === 'student') {
        updateData.class = studentClass;
        updateData.section = section;
    }

    await User.findOneAndUpdate(
        { email: session.user.email },
        updateData
    );

    redirect('/feed');
}
