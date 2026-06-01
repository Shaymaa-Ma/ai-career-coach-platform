import React, { useState } from 'react';

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    onSend(input);
    setInput('');
  };

  return (
    <div className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <form onSubmit={submit} className="flex gap-3 p-3">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI coach..."
          className="flex-1 bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none"
        />

        <button
  type="submit"
  disabled={!input.trim() || loading}
  className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform ${
    loading || !input.trim()
      ? 'bg-gray-700 cursor-not-allowed'
      : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-110'
  }`}
>
  {loading ? "..." : "Send"}
</button>

      </form>
    </div>
  );
};

export default ChatInput;