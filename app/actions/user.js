'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function getUserProfile(userId) {
    await dbConnect();
    const user = await User.findById(userId).lean();
    if (!user) return null;
    return {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt.toISOString()
    };
}

export async function updateProfile(formData) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const name = formData.get('name');
    const bio = formData.get('bio');
    const studentClass = formData.get('class');
    const section = formData.get('section');

    await dbConnect();

    const updateData = {
        name,
        bio,
    };

    if (session.user.role === 'student') {
        updateData.class = studentClass;
        updateData.section = section;
    }

    await User.findByIdAndUpdate(session.user.id, updateData);

    revalidatePath(`/profile/${session.user.id}`);
    revalidatePath('/feed'); // Update feed in case name/image changed logic (though image not editable yet)
}
