
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

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);

        // Append tags manualy if they aren't in the form data naturally (react hook state)
        // Actually we need to append them to the formData that is passed to the action OR just use the hidden input trick
        // BUT since we are using `action={createPost}`, the formData is automatically created from fields.
        // We can intercept it here if we used onClick, but simpler is to keep the hidden input for tags.

        await createPost(formData);

        // Reset form
        setContent('');
        setFile(null);
        setTags([]);
        setIsSubmitting(false);

        // Reset file input manually if needed (not easily doable without ref, but simple state reset clears preview)
    };

    return (
        <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
                <h3 className="card-title text-sm opacity-70">Share something with the school...</h3>

                <form action={handleSubmit}>
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
                                {/* Preview only works if we create object URL, skipping for simplicity or can add later */}
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
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
