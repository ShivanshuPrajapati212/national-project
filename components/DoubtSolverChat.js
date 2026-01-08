
'use client'

import { useState, useRef, useEffect } from "react";

export default function DoubtSolverChat() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Doubt Solver. Ask me anything about your studies.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await res.json();
            const aiMsg = { role: 'assistant', content: data.reply };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden shadow-lg bg-base-100">
            <div className="bg-primary text-primary-content p-4 font-bold">
                AI Doubt Solver 🤖
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
                {messages.map((m, i) => (
                    <div key={i} className={`chat ${m.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-bubble whitespace-pre-wrap">
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="chat chat-start">
                        <div className="chat-bubble animate-pulse">Thinking...</div>
                    </div>
                )}
                <div ref={bottomRef}></div>
            </div>

            <div className="p-4 bg-base-100 border-t">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        className="input input-bordered flex-1"
                        placeholder="Type your doubt here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>Send</button>
                </form>
            </div>
        </div>
    );
}
