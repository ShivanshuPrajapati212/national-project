
import { auth } from "@/auth";
import DoubtSolverChat from "@/components/DoubtSolverChat";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DoubtSolverPage() {
    const session = await auth();
    if (!session) redirect('/login');

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/feed" className="btn btn-ghost text-xl">School Network</Link>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/messages" className="btn btn-ghost" title="Messages">💬</Link>
                    <Link href="/announcements" className="btn btn-ghost">📢</Link>
                    <Link href="/feed" className="btn btn-ghost">Back to Feed</Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <DoubtSolverChat />
            </div>
        </div>
    );
}
