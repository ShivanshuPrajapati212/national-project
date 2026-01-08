
'use client'

import { useRef, useState } from "react";
import { uploadResource } from "@/app/actions/resource";

export default function UploadResourceModal({ subjects }) {
    const modalRef = useRef(null);
    const [isUploading, setIsUploading] = useState(false);

    return (
        <>
            <button className="btn btn-primary" onClick={() => modalRef.current?.showModal()}>
                Upload Resource
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Upload New Resource</h3>
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        if (isUploading) return;
                        setIsUploading(true);
                        try {
                            const formData = new FormData(e.currentTarget);
                            await uploadResource(formData);
                            modalRef.current?.close();
                        } finally {
                            setIsUploading(false);
                        }
                    }}>
                        <div className="form-control mb-2">
                            <label className="label"><span className="label-text">Title</span></label>
                            <input type="text" name="title" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control mb-2">
                            <label className="label"><span className="label-text">Subject</span></label>
                            <select name="subject" className="select select-bordered w-full">
                                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="form-control mb-2">
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea name="description" className="textarea textarea-bordered"></textarea>
                        </div>
                        <div className="form-control mb-4">
                            <label className="label"><span className="label-text">File (PDF/Image)</span></label>
                            <input type="file" name="file" className="file-input file-input-bordered w-full" required />
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isUploading}>
                            {isUploading ? <span className="loading loading-spinner"></span> : 'Upload'}
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
