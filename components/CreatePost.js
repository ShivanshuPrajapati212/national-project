
'use client'

import { useState } from "react";
import { createPost } from "@/app/actions/post";

export default function CreatePost({ defaultTag, lockedTag }) {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState(defaultTag ? [defaultTag] : []);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const availableTags = ['#Announcement', '#Sports', '#Academics', '#Art', '#Fest', '#General'];

    const toggleTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            await createPost(formData);

            // Reset form
            setContent('');
            setFile(null);
            setTags([]);
            e.target.reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
                <h3 className="card-title text-sm opacity-70">Share something with the school...</h3>

                <form onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        className="textarea textarea-bordered w-full mb-4"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={3}
                    ></textarea>

                    <div className="mb-4">
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                        />
                        {file && (
                            <div className="mt-2 relative">
                                <div className="text-xs opacity-70">Selected: {file.name}</div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                className={`badge ${tags.includes(tag) ? 'badge-primary' : 'badge-ghost'} ${lockedTag && tag === defaultTag ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                                onClick={() => {
                                    if (lockedTag && tag === defaultTag) return;
                                    toggleTag(tag);
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <input type="hidden" name="tags" value={JSON.stringify(tags)} />

                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? <span className="loading loading-spinner"></span> : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
