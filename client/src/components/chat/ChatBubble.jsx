import React from "react";
import { Bot, User } from "lucide-react";

const ChatBubble = ({ sender, message, isTyping }) => {
  const isAI = sender === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>

      {/* AVATAR */}
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-xl mr-2
        ${isAI ? "bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
              : "bg-blue-500/10 border border-blue-400/30 shadow-[0_0_12px_rgba(59,130,246,0.25)] order-last ml-2"}
        backdrop-blur-md`}
      >
        {isAI ? (
          <Bot className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
        ) : (
          <User className="w-5 h-5 text-blue-300 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
        )}
      </div>

      {/* BUBBLE */}
      <div
        className={`max-w-[85%] md:max-w-md p-3 rounded-2xl text-sm
        backdrop-blur-xl transition-all duration-300
        ${
          isAI
            ? "bg-cyan-500/5 border border-cyan-400/20 text-gray-100"
            : "bg-white/5 border border-white/10 text-white"
        }`}
      >

        {/* TYPING INDICATOR */}
        {isTyping ? (
          <div className="flex gap-1 items-center py-1">
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;