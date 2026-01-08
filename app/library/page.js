
import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getResources, uploadResource } from "@/app/actions/resource";
import UploadResourceModal from "@/components/UploadResourceModal";

const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'General'];

export default async function LibraryPage({ searchParams }) {
    const session = await auth();
    if (!session) redirect('/login');

    const subjectFilter = (await searchParams)?.subject || '';
    const resources = await getResources(subjectFilter);
    const isTeacher = session.user.role === 'teacher';

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/feed" className="btn btn-ghost text-xl">School Network</Link>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/announcements" className="btn btn-ghost">📢</Link>
                    <Link href="/calendar" className="btn btn-ghost">Events</Link>
                    <Link href="/doubt-solver" className="btn btn-ghost text-primary">AI Helper</Link>
                    <Link href="/feed" className="btn btn-ghost">Back to Feed</Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Digitized Library</h1>
                </div>

                {/* Subject Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <Link href="/library" className={`btn btn-sm ${!subjectFilter ? 'btn-primary' : 'btn-ghost'}`}>All Subjects</Link>
                    {subjects.map(sub => (
                        <Link key={sub} href={`/library?subject=${encodeURIComponent(sub)}`} className={`btn btn-sm ${subjectFilter === sub ? 'btn-primary' : 'btn-ghost'}`}>
                            {sub}
                        </Link>
                    ))}
                </div>

                {/* Resource Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.length === 0 && (
                        <div className="col-span-full text-center py-10 opacity-50">No resources found for this subject.</div>
                    )}

                    {resources.map(res => (
                        <div key={res._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                            <figure className="h-48 bg-base-300 flex items-center justify-center p-4">
                                {/* Basic file preview based on extension or generic icon */}
                                <div className="text-6xl">📄</div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-base">{res.title}</h2>
                                <div className="badge badge-outline">{res.subject}</div>
                                <p className="text-sm opacity-70 truncate">{res.description}</p>
                                <div className="mt-2 text-xs opacity-50">By {res.uploadedBy.name} • {new Date(res.createdAt).toLocaleDateString()}</div>
                                <div className="card-actions justify-end mt-4">
                                    <a href={res.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline btn-primary">
                                        Download / View
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload Modal (Hidden by default, triggered by ID) */}
            {/* Upload Modal (Triggered by Client Component) */}
            {isTeacher && (
                <div className="fixed bottom-8 right-8 z-50">
                    <UploadResourceModal subjects={subjects} />
                </div>
            )}

            {/* Script to handle modal opening since we are in Server Component? 
          Actually, for dialog.showModal() we need client side js. 
          So we better make the modal a wrapper or use a simple hack.
          Let's wrap the button and modal in a small client component or make the whole page client?
          No, let's keep page server. We'll add a small client component for the 'Add Button + Modal'.
      */}
        </div>
    );
}
