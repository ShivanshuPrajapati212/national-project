
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();
    if (session) redirect('/feed');

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6 opacity-70">Sign in to access your school network</p>

                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: "/feed" });
                        }}
                    >
                        <button className="btn btn-primary btn-wide flex gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </form>

                    <div className="mt-4 text-xs opacity-50">
                        Only Google accounts allowed.
                    </div>
                </div>
            </div>
        </div>
    );
}
