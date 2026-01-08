
'use client'

import { completeOnboarding } from "@/app/actions/onboarding";
import { useState } from "react";

export default function OnboardingPage() {
    const [role, setRole] = useState('student');

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center mb-4">Welcome to School Network</h2>
                    <p className="text-center mb-6">Please complete your profile to continue.</p>

                    <form action={completeOnboarding}>
                        <div className="form-control w-full max-w-xs mb-4">
                            <label className="label">
                                <span className="label-text">I am a...</span>
                            </label>
                            <select
                                name="role"
                                className="select select-bordered"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="parent">Parent</option>
                            </select>
                        </div>

                        {role === 'student' && (
                            <>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label">
                                        <span className="label-text">Class</span>
                                    </label>
                                    <input type="text" name="class" placeholder="e.g. 10" className="input input-bordered w-full max-w-xs" required />
                                </div>
                                <div className="form-control w-full max-w-xs mb-4">
                                    <label className="label">
                                        <span className="label-text">Section</span>
                                    </label>
                                    <input type="text" name="section" placeholder="e.g. A" className="input input-bordered w-full max-w-xs" required />
                                </div>
                            </>
                        )}

                        <div className="card-actions justify-end mt-6">
                            <button type="submit" className="btn btn-primary w-full">Get Started</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
