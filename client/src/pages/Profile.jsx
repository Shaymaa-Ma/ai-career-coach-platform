import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Edit3,
  Save,
  LogOut,
  Loader2,
  X,
} from "lucide-react";
import "../styles/global.css";

const Profile = () => {
  const { currentUser, updateProfile, logout, token, loading: authLoading } =
    useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    education: "",
    bio: "",
  });

  useEffect(() => {
    if (token && !currentUser) {
      fetch("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setFormData(data.user);
        })
        .catch(() => setError("Failed to load profile"));
    } else if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(formData);
      setEditMode(false);
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(currentUser || formData);
    setError("");
  };

  if (authLoading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
      </div>
    );
  }

  const initials = formData.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/auth?mode=login");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 pb-20 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="w-28 h-28 mx-auto rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-black shadow-2xl">
            {initials}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent">
            {formData.name || "Your Profile"}
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your AI career profile
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-10 space-y-8">

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-red-300">
              <X className="w-5 h-5" />
              {error}
            </div>
          )}

          {/* TOP ACTIONS */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              Profile Information
            </h2>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 hover:scale-105 transition flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </button>

                <button
                  onClick={handleCancel}
                  className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* FIELDS */}
          <div className="grid sm:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-purple-400" />
                Name
              </label>

              {editMode ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
                />
              ) : (
                <div className="p-4 rounded-2xl bg-white/5">
                  {formData.name || "Not set"}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-blue-400" />
                Email
              </label>

              {editMode ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-blue-500 outline-none"
                />
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 break-all">
                  {formData.email || "Not set"}
                </div>
              )}
            </div>
          </div>

          {/* MAJOR */}
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-green-400" />
              Major
            </label>

            {editMode ? (
              <input
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-green-500 outline-none"
              />
            ) : (
              <div className="p-4 rounded-2xl bg-white/5">
                {formData.major || "Not set"}
              </div>
            )}
          </div>

          {/* EDUCATION */}
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Education
            </label>

            {editMode ? (
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-indigo-500 outline-none"
              />
            ) : (
              <div className="p-4 rounded-2xl bg-white/5">
                {formData.education || "Not set"}
              </div>
            )}
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Bio
            </label>

            {editMode ? (
              <textarea
                name="bio"
                rows={5}
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
              />
            ) : (
              <div className="p-5 rounded-2xl bg-white/5 text-gray-300 min-h-[120px]">
                {formData.bio || "No bio yet..."}
              </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;