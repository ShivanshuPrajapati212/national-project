
import { auth, signIn } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">School Network</h1>
          <p className="py-6">
            The central hub for students, teachers, and parents.
            Connect, share, and organize.
          </p>
          {session ? (
            <Link href="/feed" className="btn btn-primary">Go to Feed</Link>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/feed" })
              }}
            >
              <button type="submit" className="btn btn-primary">Sign In with Google</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
