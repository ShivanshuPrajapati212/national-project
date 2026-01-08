'use client'

import { useRef, useState } from "react";
import { updateProfile } from "@/app/actions/user";

export default function EditProfileModal({ user }) {
    const modalRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <>
            <button className="btn btn-outline btn-primary btn-sm" onClick={() => modalRef.current?.showModal()}>
                Edit Profile
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

                    <form action={async (formData) => {
                        setIsSubmitting(true);
                        await updateProfile(formData);
                        setIsSubmitting(false);
                        modalRef.current?.close();
                    }}>
                        <div className="form-control mb-2">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" defaultValue={user.name} className="input input-bordered w-full" required />
                        </div>

                        <div className="form-control mb-2">
                            <label className="label"><span className="label-text">Bio</span></label>
                            <textarea name="bio" defaultValue={user.bio} className="textarea textarea-bordered w-full" placeholder="Tell us about yourself..." maxLength={160}></textarea>
                            <label className="label"><span className="label-text-alt">Max 160 chars</span></label>
                        </div>

                        {user.role === 'student' && (
                            <div className="grid grid-cols-2 gap-2">
                                <div className="form-control mb-2">
                                    <label className="label"><span className="label-text">Class</span></label>
                                    <input type="text" name="class" defaultValue={user.class} className="input input-bordered w-full" />
                                </div>
                                <div className="form-control mb-2">
                                    <label className="label"><span className="label-text">Section</span></label>
                                    <input type="text" name="section" defaultValue={user.section} className="input input-bordered w-full" />
                                </div>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-full mt-4" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
