
import Link from "next/link";
import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans">
      {/* Navbar */}
      <div className="navbar bg-base-100/90 backdrop-blur sticky top-0 z-50 border-b border-base-200">
        <div className="container mx-auto flex justify-between">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-2xl font-bold text-base-content tracking-tight">
              School Network
            </Link>
          </div>
          <div className="flex-none gap-4">
            {session ? (
              <Link href="/feed" className="btn btn-primary btn-sm md:btn-md rounded-full px-6">Go to Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm md:btn-md">Log In</Link>
                <Link href="/signup" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 shadow-lg shadow-primary/20">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero min-h-[85vh] bg-base-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-base-100 to-base-100"></div>
        <div className="hero-content text-center relative z-10 max-w-4xl px-4">
          <div>
            {/* <div className="badge badge-outline badge-lg mb-6 py-4 px-6 border-primary/20 text-primary">v2.0 Now Available 🚀</div> */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              The Digital Heart of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">School Life</span>
            </h1>
            <p className="py-6 text-xl md:text-2xl opacity-70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience a connected school unlike ever before. Real-time updates, smart resources, and instant doubts solving—all in one minimal, powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={session ? "/feed" : "/signup"} className="btn btn-primary btn-lg rounded-full px-8 shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                {session ? "Enter School" : "Join Your School"}
              </Link>
              <a href="#features" className="btn btn-ghost btn-lg rounded-full">Explore Features</a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold">Everything you need to excel</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl mb-6 text-primary">
                  📡
                </div>
                <h3 className="card-title text-2xl mb-2">Live Announcments</h3>
                <p className="opacity-70 leading-relaxed">Never miss a beat. Teachers broadcast important updates instantly. Official news, right at your fingertips.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-3xl mb-6 text-secondary">
                  🤖
                </div>
                <h3 className="card-title text-2xl mb-2">AI Tutor</h3>
                <p className="opacity-70 leading-relaxed">Stuck on a problem at 2 AM? Our Gemini-powered AI assistant provides instant, accurate explanations for any subject.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl mb-6 text-accent">
                  📚
                </div>
                <h3 className="card-title text-2xl mb-2">Digital Library</h3>
                <p className="opacity-70 leading-relaxed">Access a vast repository of notes, papers, and books shared by teachers. Your study materials, organized and accessible.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center text-3xl mb-6 text-info">
                  🗓️
                </div>
                <h3 className="card-title text-2xl mb-2">Smart Calendar</h3>
                <p className="opacity-70 leading-relaxed">Exam dates, holidays, and school events synced in one place. Plan your academic year with precision.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center text-3xl mb-6 text-success">
                  🆔
                </div>
                <h3 className="card-title text-2xl mb-2">Student Profiles</h3>
                <p className="opacity-70 leading-relaxed">Build your academic identity. Showcase your bio, class details, and posts to the school community.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
              <div className="card-body p-8">
                <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center text-3xl mb-6 text-warning">
                  📣
                </div>
                <h3 className="card-title text-2xl mb-2">Social Feed</h3>
                <p className="opacity-70 leading-relaxed">Share achievements, ask questions, and interact with peers in a safe, school-monitored environment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}


      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-content relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your school life?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Join thousands of students and teachers who are already using School Network to stay ahead.</p>
          <Link href="/signup" className="btn btn-lg bg-base-100 text-primary border-none hover:bg-base-200 rounded-full px-10 shadow-2xl">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer items-center p-5 bg-base-300 text-base-content">
        <aside className="items-center grid-flow-col">
          <div className="text-2xl mr-2">🏫</div>
          <p>Copyright © 2026 - All right reserved by L1746JR2</p>
        </aside>
      </footer>
    </div>
  );
}
