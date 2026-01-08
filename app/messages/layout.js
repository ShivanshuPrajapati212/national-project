
import { auth } from "@/auth";
import { getConversations } from "@/app/actions/message";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MessagesLayout({ children }) {
    const session = await auth();
    if (!session) redirect('/login');

    const conversations = await getConversations();

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/feed" className="btn btn-ghost text-xl">School Network</Link>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/feed" className="btn btn-ghost">Back to Feed</Link>
                </div>
            </div>

            <div className="container mx-auto p-4 h-[calc(100vh-80px)]">
                <div className="flex h-full bg-base-100 rounded-xl shadow-xl overflow-hidden">
                    {/* Sidebar / Conversation List */}
                    <div className="w-full md:w-80 border-r border-base-200 bg-base-100 flex flex-col">
                        <div className="p-4 border-b border-base-200 font-bold text-lg">
                            Messages
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {conversations.length === 0 && (
                                <div className="p-4 text-center opacity-50 text-sm">No conversations yet.</div>
                            )}
                            {conversations.map(conv => (
                                <Link
                                    key={conv.userId}
                                    href={`/messages/${conv.userId}`}
                                    className="block hover:bg-base-200 transition-colors"
                                >
                                    <div className="flex items-center gap-3 p-4 border-b border-base-200 last:border-none">
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={conv.user.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={conv.user.name} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold truncate">{conv.user.name}</div>
                                            <div className="text-sm opacity-60 truncate">{conv.lastMessage}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="hidden md:flex flex-1 flex-col bg-base-50/50">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
