
import { auth } from "@/auth";
import { getMessages, sendMessage } from "@/app/actions/message";
import { getUserProfile } from "@/app/actions/user";
import { redirect } from "next/navigation";

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
                <form action={async (formData) => {
                    "use server"
                    const content = formData.get('content');
                    if (!content) return;
                    await sendMessage(otherUserId, content);
                }} className="flex gap-2">
                    <input
                        type="text"
                        name="content"
                        className="input input-bordered flex-1"
                        placeholder="Type a message..."
                        autoComplete="off"
                        required
                    />
                    <button className="btn btn-primary btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
