"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInput: input }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center mx-auto  justify-center">
      <h1 className="text-2xl font-bold mb-4">AI Agent Chat</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="w-full p-2 border rounded-md text-black"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Ask
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <p><strong>AI:</strong> {response}</p>
        </div>
      )}
    </div>
  );
}
