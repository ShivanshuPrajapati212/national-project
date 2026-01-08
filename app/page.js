
import Link from "next/link";
import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col font-sans">
      {/* Navbar */}
      <div className="navbar bg-base-100 container mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            School Network
          </Link>
        </div>
        <div className="flex-none gap-4">
          {session ? (
            <Link href="/feed" className="btn btn-primary">Go to Feed</Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Login</Link>
              <Link href="/signup" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero min-h-[80vh] bg-base-200 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="hero-content text-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Connect. Learn. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Grow Together.
              </span>
            </h1>
            <p className="py-6 text-xl opacity-80 mb-8">
              The all-in-one platform for our school community. Manage exams, share resources, clear doubts, and stay updated—all in one place.
            </p>
            <div className="flex justify-center gap-4">
              <Link href={session ? "/feed" : "/login"} className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">
                {session ? "Launch Dashboard" : "Join the Network"}
              </Link>
              <a href="#features" className="btn btn-ghost btn-lg">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-base-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Everything you need to excel</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="card-title text-xl">Social Feed</h3>
                <p className="opacity-70">Share updates, announcements, and achievements with the whole school.</p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="card-title text-xl">Exam Calendar</h3>
                <p className="opacity-70">Never miss a deadline. Track exams, holidays, and school events.</p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="card-title text-xl">Digital Library</h3>
                <p className="opacity-70">Access study materials, notes, and resources uploaded by teachers.</p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl hover:-translate-y-2 transition-transform">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="card-title text-xl">AI Assistant</h3>
                <p className="opacity-70">Stuck on a problem? Ask our AI Doubt Solver for instant help.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <p className="font-bold text-lg">
            School Social Network <br />
            Providing reliable connection since 2026
          </p>
          <p>Copyright © 2026 - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
}
