
import { auth } from "@/auth";
import CreatePost from "@/components/CreatePost";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getAnnouncements() {
    await dbConnect();
    const posts = await Post.find({ tags: '#Announcement' })
        .sort({ createdAt: -1 })
        .populate('author', 'name image role')
        .lean();

    return posts.map(post => ({
        ...post,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        author: {
            ...post.author,
            _id: post.author._id.toString()
        }
    }));
}

export default async function AnnouncementsPage() {
    const session = await auth();
    if (!session) redirect('/login');

    const posts = await getAnnouncements();
    const isTeacher = session.user.role === 'teacher';

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

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-primary">📢 Official Announcements</h1>

                {isTeacher && (
                    <div className="mb-8">
                        <div className="alert alert-info shadow-lg mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>You are posting as a Teacher. All posts here are automatically marked as Announcements.</span>
                        </div>
                        <CreatePost defaultTag="#Announcement" lockedTag={true} />
                    </div>
                )}

                <div className="space-y-6">
                    {posts.length === 0 && (
                        <div className="text-center py-10 opacity-50">No announcements yet.</div>
                    )}

                    {posts.map(post => (
                        <div key={post._id} className="card bg-base-100 shadow-md border-l-4 border-l-primary">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={post.author.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold flex items-center gap-2">
                                            {post.author.name}
                                            <span className="badge badge-primary">Teacher</span>
                                        </div>
                                        <div className="text-xs opacity-50 capitalize">{new Date(post.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>

                                <p className="whitespace-pre-wrap text-lg">{post.content}</p>

                                {post.imageUrl && (
                                    <figure className="mt-4 rounded-xl overflow-hidden">
                                        <img src={post.imageUrl} alt="Post image" className="w-full object-cover max-h-96" />
                                    </figure>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
