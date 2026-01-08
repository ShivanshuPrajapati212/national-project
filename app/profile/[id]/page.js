
import { auth } from "@/auth";
import { getUserProfile } from "@/app/actions/user";
import Post from "@/models/Post";
import dbConnect from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditProfileModal from "@/components/EditProfileModal";

async function getUserPosts(userId) {
    await dbConnect();
    const posts = await Post.find({ author: userId })
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

export default async function ProfilePage({ params }) {
    const session = await auth();
    if (!session) redirect('/login');

    const profileId = (await params).id;
    const profileUser = await getUserProfile(profileId);

    if (!profileUser) {
        return <div className="text-center py-20">User not found.</div>;
    }

    const posts = await getUserPosts(profileId);
    const isOwnProfile = session.user.id === profileId;

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
                {/* Profile Header */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={profileUser.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={profileUser.name} />
                                </div>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row gap-2 items-center md:items-baseline mb-2">
                                    <h1 className="text-3xl font-bold">{profileUser.name}</h1>
                                    <span className="badge badge-primary badge-outline capitalize">{profileUser.role}</span>
                                </div>

                                <p className="opacity-70 mb-4 whitespace-pre-wrap">{profileUser.bio || "No bio yet."}</p>

                                {profileUser.role === 'student' && (
                                    <div className="flex gap-4 justify-center md:justify-start text-sm opacity-80 mb-4">
                                        <div className="badge badge-ghost">Class: {profileUser.class || 'N/A'}</div>
                                        <div className="badge badge-ghost">Section: {profileUser.section || 'N/A'}</div>
                                    </div>
                                )}

                                <div className="flex gap-2 justify-center md:justify-start">
                                    {isOwnProfile ? (
                                        <EditProfileModal user={profileUser} />
                                    ) : (
                                        <Link href={`/messages/${profileId}`} className="btn btn-primary btn-sm">
                                            Message
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User's Posts */}
                <h2 className="text-2xl font-bold mb-4">Posts</h2>
                <div className="space-y-6">
                    {posts.length === 0 && (
                        <div className="text-center py-10 opacity-50">No posts shared yet.</div>
                    )}

                    {posts.map(post => (
                        <div key={post._id} className="card bg-base-100 shadow-md">
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
                                            <span className={`badge badge-sm ${post.author.role === 'teacher' ? 'badge-primary' :
                                                post.author.role === 'parent' ? 'badge-secondary' : 'badge-ghost'
                                                }`}>
                                                {post.author.role}
                                            </span>
                                        </div>
                                        <div className="text-xs opacity-50 capitalize">{new Date(post.createdAt).toLocaleDateString()}</div>
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
    );
}
