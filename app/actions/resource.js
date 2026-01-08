
'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Resource from "@/models/Resource";
import { revalidatePath } from "next/cache";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || process.env.NEXT_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_IMAGEKIT_URL_ENDPOINT,
});

export async function uploadResource(formData) {
    const session = await auth();
    if (!session || session.user.role !== 'teacher') {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title');
    const description = formData.get('description');
    const subject = formData.get('subject');
    const file = formData.get('file');

    if (!file || file.size === 0) {
        throw new Error('No file provided');
    }

    let fileUrl = '';
    let fileId = '';

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const response = await imagekit.upload({
            file: buffer,
            fileName: file.name,
            folder: '/school-library',
            useUniqueFileName: true,
        });
        fileUrl = response.url;
        fileId = response.fileId;
    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw new Error("Failed to upload file.");
    }

    await dbConnect();

    await Resource.create({
        title,
        description,
        subject,
        fileUrl,
        fileId,
        uploadedBy: session.user.id
    });

    revalidatePath('/library');
}

export async function getResources(subjectFilter) {
    await dbConnect();
    const query = subjectFilter ? { subject: subjectFilter } : {};

    // Sort by newest first
    const resources = await Resource.find(query)
        .sort({ createdAt: -1 })
        .populate('uploadedBy', 'name')
        .lean();

    return resources.map(r => ({
        ...r,
        _id: r._id.toString(),
        uploadedBy: {
            ...r.uploadedBy,
            _id: r.uploadedBy._id.toString()
        },
        createdAt: r.createdAt.toISOString()
    }));
}
