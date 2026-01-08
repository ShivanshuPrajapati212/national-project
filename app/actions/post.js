
'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Not authenticated');
    }

    const content = formData.get('content');
    const imageUrl = formData.get('imageUrl');
    const fileId = formData.get('fileId');
    const tagString = formData.get('tags'); // Expecting JSON string or comma-separated

    let tags = [];
    try {
        tags = JSON.parse(tagString);
    } catch (e) {
        if (typeof tagString === 'string') {
            tags = tagString.split(',').map(t => t.trim()).filter(Boolean);
        }
    }

    await dbConnect();

    await Post.create({
        content,
        imageUrl,
        fileId,
        author: session.user.id,
        tags,
    });

    revalidatePath('/feed');
}
