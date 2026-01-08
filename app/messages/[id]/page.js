
import { auth } from "@/auth";
import { getMessages } from "@/app/actions/message";
import { getUserProfile } from "@/app/actions/user";
import { redirect } from "next/navigation";
import ChatInput from "@/components/ChatInput";

export default async function ChatPage({ params }) {
    const session = await auth();
    if (!session) redirect('/login');

    const otherUserId = (await params).id;
    const otherUser = await getUserProfile(otherUserId);

    if (!otherUser) {
        return <div className="p-8 text-center">User not found.</div>
    }

    const messages = await getMessages(otherUserId);

    return (
        <div className="flex-1 flex flex-col h-full absolute inset-0 md:relative bg-base-100 z-10">
            {/* Header */}
            <div className="p-4 border-b border-base-200 flex items-center gap-3 bg-base-100/95 sticky top-0 backdrop-blur">
                <a href="/messages" className="md:hidden btn btn-sm btn-circle btn-ghost">←</a>
                <div className="avatar px-1">
                    <div className="w-10 rounded-full">
                        <img src={otherUser.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                    </div>
                </div>
                <div className="font-bold">{otherUser.name}</div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/30 flex flex-col">
                {messages.length === 0 && (
                    <div className="flex-1 flex items-center justify-center opacity-40">
                        <p>No messages yet. Say hi! 👋</p>
                    </div>
                )}

                {messages.map(msg => {
                    const isMe = msg.sender === session.user.id;
                    return (
                        <div key={msg._id} className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
                            <div className={`chat-bubble ${isMe ? 'chat-bubble-primary' : 'bg-base-200 text-base-content'}`}>
                                {msg.content}
                            </div>
                            <div className="chat-footer opacity-50 text-xs mt-1">
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-base-200 bg-base-100">
                <ChatInput recipientId={otherUserId} />
            </div>
        </div>
    );
}
