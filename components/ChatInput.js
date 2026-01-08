'use client'

import { sendMessage } from "@/app/actions/message";
import { useState, useRef } from "react";

export default function ChatInput({ recipientId }) {
    const [isSending, setIsSending] = useState(false);
    const formRef = useRef(null);

    return (
        <form action={async (formData) => {
            const content = formData.get('content');
            if (!content || !content.trim()) return;

            setIsSending(true);
            try {
                await sendMessage(recipientId, content);
                formRef.current?.reset();
            } finally {
                setIsSending(false);
            }
        }} className="flex gap-2" ref={formRef}>
            <input
                type="text"
                name="content"
                className="input input-bordered flex-1"
                placeholder="Type a message..."
                autoComplete="off"
                required
            />
            <button className="btn btn-primary btn-circle" disabled={isSending}>
                {isSending ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                )}
            </button>
        </form>
    )
}
