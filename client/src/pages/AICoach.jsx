import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";

import ChatBubble from "../components/chat/ChatBubble";
import ChatInput from "../components/chat/ChatInput";
import Sidebar from "../components/chat/Sidebar";

/**
 * AICoach Chat Page
 *
 * This component implements a full AI chat interface with session management.
 *
 * Features:
 * - Supports authenticated users and guest mode
 * - Loads, creates, renames, and deletes chat sessions
 * - Fetches and displays conversation messages per session
 * - Sends messages to backend AI endpoint and streams replies into chat
 * - Auto-scrolls to latest messages
 * - Persists active session using localStorage
 *
 * Structure:
 * - Sidebar: manages chat sessions (history, create, rename, delete)
 * - Main chat area: displays messages and input box
 * - ChatBubble: renders user/AI messages
 * - ChatInput: handles message input and sending
 *
 * API Endpoints Used:
 * - GET /api/chat/sessions
 * - POST /api/chat/session
 * - GET /api/chat/messages/:id
 * - POST /api/chat/send
 * - DELETE /api/chat/session/:id
 * - PUT /api/chat/session/:id
 *
 * Notes:
 * - Guest users have a temporary single-session chat (no persistence)
 * - Logged-in users have full session history support
 */

const AICoach = () => {

  const token = localStorage.getItem("token");

  const isGuest = !token;

  const [sessions, setSessions] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  // ================= AUTO SCROLL =================
  const scrollBottom = () => {
    requestAnimationFrame(() => {
      const el = containerRef.current;

      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  };

  useEffect(scrollBottom, [messages, loading]);

  // ================= LOAD MESSAGES =================
  const loadMessages = useCallback(async (id) => {

    if (isGuest) return;

    setActive(id);

    localStorage.setItem("activeChat", id);

    try {

      const res = await fetch(
        `http://localhost:5000/api/chat/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setMessages(Array.isArray(data) ? data : []);

    } catch (err) {
      console.log("Load messages error:", err);
    }

  }, [isGuest, token]);

  // ================= LOAD SESSIONS =================
  const loadSessions = useCallback(async () => {

    if (isGuest) return;

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat/sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      const safe = Array.isArray(data) ? data : [];

      setSessions(safe);

      const last = localStorage.getItem("activeChat");

      if (last && safe.find((s) => s.id === Number(last))) {
        loadMessages(Number(last));
      }

    } catch (err) {
      console.log("Load sessions error:", err);
    }

  }, [isGuest, token, loadMessages]);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // ================= NEW CHAT =================
  const newChat = async () => {

    // Guest mode
    if (isGuest) {
      setActive("guest");
      setMessages([]);
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat/session",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setSessions((prev) => [data, ...prev]);

      setMessages([]);

      setActive(data.sessionId);

      localStorage.setItem("activeChat", data.sessionId);

    } catch (err) {
      console.log("Create chat error:", err);
    }

  };

  // ================= DELETE CHAT =================
  const deleteChat = async (id) => {

    if (isGuest) return;

    try {

      await fetch(
        `http://localhost:5000/api/chat/session/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updated = sessions.filter((s) => s.id !== id);

      setSessions(updated);

      if (active === id) {
        setActive(null);
        setMessages([]);
        localStorage.removeItem("activeChat");
      }

    } catch (err) {
      console.log("Delete chat error:", err);
    }

  };

  // ================= RENAME CHAT =================
  const renameChat = async (id) => {

    if (isGuest) return;

    const title = prompt("New name:");

    if (!title) return;

    try {

      await fetch(
        `http://localhost:5000/api/chat/session/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title })
        }
      );

      loadSessions();

    } catch (err) {
      console.log("Rename chat error:", err);
    }

  };

  // ================= SEND MESSAGE =================
  const send = async (text) => {

    if (!text.trim()) return;

    const userMsg = {
      sender: "user",
      message: text
    };

    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    let sessionId = active;

    try {

      // ================= GUEST MODE =================
      if (isGuest) {

        const res = await fetch(
          "http://localhost:5000/api/chat/send",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              sessionId: "guest",
              message: text
            })
          }
        );

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: data.reply
          }
        ]);

        setLoading(false);

        return;
      }

      // ================= CREATE SESSION IF NONE =================
      if (!sessionId) {

        const res = await fetch(
          "http://localhost:5000/api/chat/session",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        sessionId = data.sessionId;

        setSessions((prev) => [data, ...prev]);

        setActive(sessionId);

        localStorage.setItem("activeChat", sessionId);
      }

      // ================= SEND MESSAGE =================
      const res = await fetch(
        "http://localhost:5000/api/chat/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sessionId,
            message: text
          })
        }
      );

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: data.reply
        }
      ]);

    } catch (err) {

      console.log("Send message error:", err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Something went wrong. Please try again."
        }
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}
      <Sidebar
        sessions={sessions}
        activeId={active}
        onSelect={loadMessages}
        onNew={newChat}
        onRename={renameChat}
        onDelete={deleteChat}
      />

      {/* MAIN CHAT */}
      <div className="flex-1 flex flex-col pt-24">

        {/* MESSAGES */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >

          {messages.map((m, i) => (
            <ChatBubble
              key={i}
              sender={m.sender}
              message={m.message}
            />
          ))}

          {loading && (
            <ChatBubble
              sender="ai"
              isTyping
            />
          )}

        </div>

        {/* INPUT */}
        <div className="sticky bottom-0 bg-slate-950/95 p-3 border-t border-white/5 backdrop-blur-xl">

          <ChatInput
            onSend={send}
            loading={loading}
          />

        </div>

      </div>

    </div>
  );
};

export default AICoach;