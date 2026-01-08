
'use client'

import { ImageKitContext, IKUpload } from "imagekitio-next";
import { useState } from "react";
import { createPost } from "@/app/actions/post";

const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit/auth");
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

export default function CreatePost() {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fileId, setFileId] = useState('');
    const [tags, setTags] = useState([]);
    const [uploading, setUploading] = useState(false);

    const availableTags = ['#Sports', '#Academics', '#Art', '#Fest', '#General'];

    const handleSuccess = (res) => {
        setImageUrl(res.url);
        setFileId(res.fileId);
        setUploading(false);
    };

    const handleError = (err) => {
        console.error('Upload Error', err);
        setUploading(false);
    };

    const handleUploadStart = () => {
        setUploading(true);
    };

    const toggleTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        // We are using a form action but we need to inject the client-side state
        // We can do this by using hidden inputs or calling the action programmatically.
        // Let's use hidden inputs for the form submission to be simple.

        // Reset after submit (this happens automatically if we used useOptimistic but simple reset works for now)
        setTimeout(() => {
            setContent('');
            setImageUrl('');
            setTags([]);
            setFileId('');
        }, 1000);
    };

    return (
        <div className="card bg-base-100 shadow-lg mb-6">
            <div className="card-body">
                <h3 className="card-title text-sm opacity-70">Share something with the school...</h3>

                <form action={createPost} onSubmit={handleSubmit}>
                    <textarea
                        name="content"
                        className="textarea textarea-bordered w-full mb-4"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows={3}
                    ></textarea>

                    <ImageKitContext
                        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                        publicKey={process.env.NEXT_PUBLIC_PUBLIC_KEY}
                        authenticator={authenticator}
                    >
                        <div className="mb-4">
                            <IKUpload
                                fileName="post-image.jpg"
                                onSuccess={handleSuccess}
                                onError={handleError}
                                onUploadStart={handleUploadStart}
                                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            />
                            {uploading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                            {imageUrl && (
                                <div className="mt-2 relative">
                                    <img src={imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => setImageUrl('')}
                                        className="btn btn-xs btn-circle btn-ghost absolute -top-2 -right-2 bg-base-100"
                                    >✕</button>
                                </div>
                            )}
                        </div>
                    </ImageKitContext>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                className={`badge ${tags.includes(tag) ? 'badge-primary' : 'badge-ghost'} cursor-pointer`}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    <input type="hidden" name="imageUrl" value={imageUrl} />
                    <input type="hidden" name="fileId" value={fileId} />
                    <input type="hidden" name="tags" value={JSON.stringify(tags)} />

                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-primary" disabled={uploading}>
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
