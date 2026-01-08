
'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function addEvent(formData) {
    const session = await auth();
    if (!session || session.user.role !== 'teacher') {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title');
    const date = formData.get('date');
    const type = formData.get('type');
    const description = formData.get('description');

    await dbConnect();

    await Event.create({
        title,
        date: new Date(date),
        type,
        description,
        createdBy: session.user.id
    });

    revalidatePath('/calendar');
}

export async function getEvents() {
    await dbConnect();
    const events = await Event.find({}).sort({ date: 1 }).lean();
    return events.map(e => ({
        ...e,
        _id: e._id.toString(),
        date: e.date.toISOString(),
        createdBy: e.createdBy?.toString(),
    }));
}
