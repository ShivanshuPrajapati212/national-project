
import { auth } from "@/auth";
import CreatePost from "@/components/CreatePost";
import dbConnect from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User"; // Ensure User model is loaded
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPosts(filterTag) {
    await dbConnect();
    const query = filterTag ? { tags: filterTag } : {};
    // Populate author to get name and image
    const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .populate('author', 'name image role')
        .lean(); // plain JS objects

    // Convert _id and dates to string/iso for serialization if needed, or just pass directly if handling in server component
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

export default async function FeedPage({ searchParams }) {
    const session = await auth();
    if (!session) redirect('/login');

    const tag = (await searchParams)?.tag || '';
    const posts = await getPosts(tag);

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/feed" className="btn btn-ghost text-xl">School Network</Link>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/messages" className="btn btn-ghost" title="Messages">💬</Link>
                    <Link href="/announcements" className="btn btn-ghost">📢</Link>
                    <Link href="/calendar" className="btn btn-ghost">Events</Link>
                    <Link href="/library" className="btn btn-ghost">Library</Link>
                    <Link href="/doubt-solver" className="btn btn-ghost text-primary">AI Helper</Link>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={session.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link href={`/profile/${session.user.id}`}>Profile</Link></li>
                            <li>
                                <form action={async () => {
                                    'use server';
                                    await import('@/auth').then(m => m.signOut());
                                }}>
                                    <button>Logout</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar Filters */}
                <div className="hidden md:block col-span-1">
                    <div className="card bg-base-100 shadow-sm sticky top-24">
                        <div className="card-body p-4">
                            <h3 className="font-bold mb-2">Filters</h3>
                            <ul className="menu bg-base-100 w-full p-0 [&_li>*]:rounded-none">
                                <li><Link href="/feed" className={!tag ? 'active' : ''}>All Posts</Link></li>
                                <li><Link href="/feed?tag=%23Announcement" className={tag === '#Announcement' ? 'active' : ''}>#Announcement</Link></li>
                                <li><Link href="/feed?tag=%23Sports" className={tag === '#Sports' ? 'active' : ''}>#Sports</Link></li>
                                <li><Link href="/feed?tag=%23Academics" className={tag === '#Academics' ? 'active' : ''}>#Academics</Link></li>
                                <li><Link href="/feed?tag=%23Art" className={tag === '#Art' ? 'active' : ''}>#Art</Link></li>
                                <li><Link href="/feed?tag=%23Fest" className={tag === '#Fest' ? 'active' : ''}>#Fest</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Feed Content */}
                <div className="col-span-1 md:col-span-3">
                    <CreatePost />

                    <div className="space-y-6">
                        {posts.length === 0 && (
                            <div className="text-center py-10 opacity-50">No posts yet. Be the first!</div>
                        )}

                        {posts.map(post => (
                            <div key={post._id} className="card bg-base-100 shadow-md">
                                <div className="card-body">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="dropdown dropdown-hover">
                                            <div tabIndex={0} role="button" className="flex items-center gap-3 cursor-pointer group">
                                                <div className="avatar group-hover:ring group-hover:ring-primary group-hover:ring-offset-2 transition-all rounded-full">
                                                    <div className="w-10 rounded-full">
                                                        <img src={post.author.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                                                        {post.author.name}
                                                        <span className={`badge badge-sm ${post.author.role === 'teacher' ? 'badge-primary' :
                                                            post.author.role === 'parent' ? 'badge-secondary' : 'badge-ghost'
                                                            }`}>
                                                            {post.author.role}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs opacity-50 capitalize font-normal text-base-content">{new Date(post.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><Link href={`/profile/${post.author._id}`}>View Profile</Link></li>
                                                {session.user.id !== post.author._id && (
                                                    <li><Link href={`/messages/${post.author._id}`}>Message</Link></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <p className="whitespace-pre-wrap">{post.content}</p>

                                    {post.imageUrl && (
                                        <figure className="mt-4 rounded-xl overflow-hidden">
                                            <img src={post.imageUrl} alt="Post image" className="w-full object-cover max-h-96" />
                                        </figure>
                                    )}

                                    <div className="card-actions justify-end mt-4">
                                        {post.tags.map(t => (
                                            <div key={t} className="badge badge-outline">{t}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
