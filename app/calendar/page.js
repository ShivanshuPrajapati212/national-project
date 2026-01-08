
import { auth } from "@/auth";
import CalendarView from "@/components/CalendarView";
import { getEvents } from "@/app/actions/event";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CalendarPage() {
    const session = await auth();
    if (!session) redirect('/login');

    const events = await getEvents();
    const userRole = session.user.role;

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
                <div className="flex-1">
                    <Link href="/feed" className="btn btn-ghost text-xl">School Network</Link>
                </div>
                <div className="flex-none gap-2">
                    <Link href="/announcements" className="btn btn-ghost">📢</Link>
                    <Link href="/library" className="btn btn-ghost">Library</Link>
                    <Link href="/doubt-solver" className="btn btn-ghost text-primary">AI Helper</Link>
                    <Link href="/feed" className="btn btn-ghost">Back to Feed</Link>
                </div>
            </div>

            <CalendarView events={events} userRole={userRole} />
        </div>
    );
}
