'use server'

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

// Send a message
export async function sendMessage(recipientId, content) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    if (!content || !content.trim()) throw new Error("Message content is required");

    await dbConnect();

    await Message.create({
        sender: session.user.id,
        recipient: recipientId,
        content: content,
    });

    revalidatePath(`/messages/${recipientId}`);
    revalidatePath('/messages');
}

// Get messages between current user and another user
export async function getMessages(otherUserId) {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    await dbConnect();

    const messages = await Message.find({
        $or: [
            { sender: session.user.id, recipient: otherUserId },
            { sender: otherUserId, recipient: session.user.id }
        ]
    })
        .sort({ createdAt: 1 })
        .lean();

    // Mark as read (basic implementation)
    // Ideally we only mark messages where recipient == me and read == false
    // But for this MVP query simplicity, we can do it later or in a separate call if needed for unread counts.

    return messages.map(msg => ({
        ...msg,
        _id: msg._id.toString(),
        sender: msg.sender.toString(),
        recipient: msg.recipient.toString(),
        createdAt: msg.createdAt.toISOString()
    }));
}

// Get list of conversations (users communicated with)
export async function getConversations() {
    const session = await auth();
    if (!session) return [];

    await dbConnect();
    const myId = session.user.id;

    // Aggregation to find all unique users communicated with
    // This is a bit complex in Mongoose without a separate "Conversation" model.
    // Strategy: Find all unique {sender, recipient} pairs involving myId, then group by the OTHER person.

    const messages = await Message.find({
        $or: [{ sender: myId }, { recipient: myId }]
    })
        .sort({ createdAt: -1 })
        .populate('sender', 'name image')
        .populate('recipient', 'name image')
        .lean();

    const conversations = new Map();

    messages.forEach(msg => {
        const isSender = msg.sender._id.toString() === myId;
        const otherUser = isSender ? msg.recipient : msg.sender;
        const otherUserId = otherUser._id.toString();

        if (!conversations.has(otherUserId)) {
            conversations.set(otherUserId, {
                userId: otherUserId,
                user: {
                    name: otherUser.name,
                    image: otherUser.image,
                },
                lastMessage: msg.content,
                lastMessageTime: msg.createdAt.toISOString(),
            });
        }
    });

    return Array.from(conversations.values());
}
