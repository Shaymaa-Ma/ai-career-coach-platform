import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { List, X, Sparkles, User as UserIcon, LogOut, ChevronsUpDown } from "lucide-react";
import logo from "../assets/logo2.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const features = [
    { name: "AI Resume Analyzer", path: "/upload" },
    { name: "Analysis Dashboard", path: "/dashboard" },
    { name: "AI Learning Roadmap", path: "/roadmap" },
    { name: "AI Career Coach", path: "/coach" },
    { name: "AI Interview Prep", path: "/interview" },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    setProfileOpen(false);
    navigate("/auth?mode=login");
  };

  const initials = currentUser?.name
    ? currentUser.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "";

  return (
    <nav role="navigation" aria-label="Main navigation" className="fixed top-0 left-0 w-full z-50 backdrop-blur-3xl bg-black/40 border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
      <div className="relative px-6 md:px-8 py-4 md:py-5 flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="AI Coach Logo"
              className="w-full h-full object-cover"
              
            />
          </div>
        </Link>
        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {/* Features Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFeatureOpen(!featureOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/20 hover:from-primary/30 hover:to-secondary/30 hover:shadow-lg hover:shadow-primary/25 font-semibold text-white transition-all duration-300 group hover:scale-105 animate-fade-in"
              aria-label="Toggle features menu"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Features
              <ChevronsUpDown className="w-5 h-5 transition-transform" style={{ transform: featureOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {featureOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 rounded-3xl bg-black/90 backdrop-blur-xl border border-white/15 shadow-2xl animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="p-4">
                  {features.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setFeatureOpen(false)}
                      className="group flex items-center p-5 rounded-2xl hover:bg-gradient-to-r hover:from-purple-400/10 hover:to-blue-400/10 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 text-white font-medium relative overflow-hidden"
                    >
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* AUTH */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center">
                  {initials}
                </div>
                <span>{currentUser?.name}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-black/95 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl animate-slide-in-from-top">
                  <Link
                    to="/profile"
                    className="px-6 py-4 hover:bg-white/10 rounded-t-2xl transition-all flex items-center gap-3"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 text-primary flex-shrink-0" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-4 hover:bg-red-500/20 rounded-b-2xl transition-all flex items-center gap-3"
                  >
                    <LogOut className="w-5 h-5 text-red-400 flex-shrink-0" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth">
                <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white" onClick={() => setOpen(!open)} aria-label="Toggle mobile menu">
          {open ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-lg md:hidden z-40" onClick={() => setOpen(false)} />
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-screen w-80 bg-black/95 backdrop-blur-3xl border-l border-purple-500/50 shadow-2xl md:hidden z-50 transform transition-all duration-500 ease-out" style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}>
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20 bg-gradient-to-r from-transparent to-purple-500/10 flex items-center justify-between drop-shadow-lg sticky top-0 z-10 backdrop-blur-sm">
              <Link to="/" onClick={() => setOpen(false)} className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-md">
                AI Coach
              </Link>
              <button onClick={() => setOpen(false)} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all shadow-md hover:shadow-lg hover:scale-105">
                <X className="w-7 h-7 text-white drop-shadow-sm" />
              </button>
            </div>

            {/* Navigation */}
            <div className="p-6 flex-1 overflow-y-auto">
              <h3 className="text-xl font-black mb-8 pb-4 border-b border-slate-700 text-white tracking-wide uppercase">
                Features
              </h3>
              <div className="space-y-3">
                {features.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="group flex items-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-purple-400/20 hover:to-blue-400/20 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden text-white drop-shadow-md font-medium hover:drop-shadow-lg"
                  >
                    <span className="text-2xl mr-4 flex-shrink-0">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Get Started Button + Auth Section */}
            <div className="p-6 border-t-2 border-purple-500/30 bg-gradient-to-t from-purple-500/10 to-transparent backdrop-blur-md relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />
              {isAuthenticated ? (
                <button
                  className="w-full flex items-center gap-4 p-5 rounded-2xl relative z-10 bg-white/15 backdrop-blur-lg border border-white/30 shadow-2xl hover:shadow-3xl hover:bg-white/25 hover:border-white/50 transition-all duration-300 group hover:scale-[1.02]"
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-2xl flex items-center justify-center shadow-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                    <span className="font-black text-lg text-white drop-shadow-lg">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-white drop-shadow-md truncate">{currentUser?.name}</p>
                    <p className="text-sm font-medium text-gray-200 drop-shadow-sm">Manage Account</p>
                  </div>
                  <ChevronsUpDown className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:rotate-180 transition-all duration-300 drop-shadow-sm" />
                </button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)}>
                  <button className="w-full py-4 px-6 font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl relative z-10">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
