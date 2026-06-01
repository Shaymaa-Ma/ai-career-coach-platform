import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Loader2, X, Users, Globe } from "lucide-react";
import '../styles/global.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');

        setTimeout(() => {
          setStatus('');
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        setStatus('error');
      }

    } catch (err) {
      console.log("CONTACT ERROR:", err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto relative z-10">

        {/* HERO */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>

          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Have questions about your career journey? Our AI platform team is ready to help you grow.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Globe className="text-purple-400" />
                Contact Channels
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                  <Mail className="text-blue-400" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-400 text-sm">support@aicareercoach.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                  <MessageCircle className="text-green-400" />
                  <div>
                    <p className="font-semibold">Community</p>
                    <p className="text-gray-400 text-sm">Discord AI Career Hub</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
                  <X className="text-cyan-400" />
                  <div>
                    <p className="font-semibold">Social</p>
                    <p className="text-gray-400 text-sm">@aicareercoach</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                <p className="text-3xl font-black text-purple-400">10K+</p>
                <p className="text-gray-400 text-sm">Users</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                <p className="text-3xl font-black text-blue-400">24h</p>
                <p className="text-gray-400 text-sm">Response</p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

            <h2 className="text-2xl font-bold mb-8 text-center">
              Send Message
            </h2>

            {status === 'success' ? (
              <div className="text-center py-16">
                <Send className="mx-auto text-green-400 w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-green-400">Message Sent!</h3>
                <p className="text-gray-400 mt-2">We will reply soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
                />

                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 outline-none"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    "Send Message"
                  )}
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-center">
                    Something went wrong. Try again.
                  </p>
                )}

              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;