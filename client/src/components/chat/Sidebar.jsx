import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Menu,
  MessageSquare
} from "lucide-react";

const Sidebar = ({
  sessions,
  activeId,
  onSelect,
  onNew,
  onRename,
  onDelete
}) => {
  const [width, setWidth] = useState(260);
  const [open, setOpen] = useState(false);

  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(260);

  const startDrag = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.userSelect = "none";
  };

  const stopDrag = () => {
    dragging.current = false;
    document.body.style.userSelect = "auto";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging.current) return;

      const delta = e.clientX - startX.current;
      const newWidth = startWidth.current + delta;

      setWidth(Math.max(220, Math.min(420, newWidth)));
    };

    const handleMouseUp = () => stopDrag();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-24 left-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl backdrop-blur-lg border border-white/10 shadow-lg transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-50 md:z-0 bg-black/40 backdrop-blur-2xl border-r border-white/10 transition-all
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width }}
      >
        {/* HEADER */}
        <div className="pt-28 px-3">
          <button
            onClick={onNew}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg hover:scale-105 transition font-semibold text-white"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {/* SESSIONS */}
        <div className="mt-4 px-2 overflow-y-auto h-[calc(100%-140px)]">
          {Array.isArray(sessions) &&
            sessions.map((s) => (
              <div
                key={s.id}
                className={`p-3 mb-2 rounded-xl cursor-pointer flex justify-between items-center transition-all ${
                  activeId === s.id
                    ? "bg-white/20 border border-white/20"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {/* LEFT SIDE (SELECT CHAT) */}
                <div
                  onClick={() => onSelect(s.id)}
                  className="flex items-center gap-2 flex-1 truncate text-white"
                >
                  <MessageSquare className="w-4 h-4 text-purple-300 flex-shrink-0" />
                  <span className="truncate">{s.title}</span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requestAnimationFrame(() => onRename(s.id));
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition"
                  >
                    <Pencil className="w-4 h-4 text-blue-300" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      requestAnimationFrame(() => onDelete(s.id));
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* RESIZER */}
        <div
          onMouseDown={startDrag}
          className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize bg-white/10 hover:bg-white/20 transition"
        />
      </div>
    </>
  );
};

export default Sidebar;