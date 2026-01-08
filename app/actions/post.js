
'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_IMAGEKIT_URL_ENDPOINT,
});

export async function createPost(formData) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Not authenticated');
    }

    const content = formData.get('content');
    const file = formData.get('file'); // File object
    const tagString = formData.get('tags');

    let imageUrl = '';
    let fileId = '';

    // Handle Image Upload if file exists and has size
    if (file && file.size > 0) {
        try {
            const buffer = Buffer.from(await file.arrayBuffer());
            const response = await imagekit.upload({
                file: buffer,
                fileName: file.name,
                folder: '/school-network-posts'
            });
            imageUrl = response.url;
            fileId = response.fileId;
        } catch (error) {
            console.error("ImageKit Upload Error:", error);
            throw new Error("Failed to upload image.");
        }
    }

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
