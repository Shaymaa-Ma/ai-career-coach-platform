import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, GraduationCap, BookOpen, Loader2, FileText } from 'lucide-react';
import '../styles/auth.css';
import '../styles/global.css';

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '',
    education: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const { signup, login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const urlMode = searchParams.get('mode') || 'login';
    setMode(urlMode);
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateSignup = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.major.trim()) newErrors.major = 'Major is required';
    if (!formData.education.trim()) newErrors.education = 'Education is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError('');

    try {
      if (mode === 'signup') {
        if (!validateSignup()) return;
        await signup(formData);
        navigate('/profile');
      } else {
        if (!validateLogin()) return;
        await login(formData.email, formData.password);
        navigate('/profile');
      }
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'signup' : 'login';
    setMode(newMode);
    setSearchParams({ mode: newMode });
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      major: '',
      education: '',
      bio: ''
    });
    setErrors({});
    setGeneralError('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="glass-card p-12 text-center animate-pulse">
          <Loader2 className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-spin" />
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen pt-28 sm:pt-32 pb-16 bg-gradient-to-br from-black via-slate-950 to-slate-900 text-white flex justify-center p-4 relative overflow-y-auto">

    {/* Floating elements */}
    <div className="absolute inset-0">
      <div className="absolute top-24 sm:top-32 right-10 sm:right-32 w-64 sm:w-72 h-64 sm:h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>

    {/* Card wrapper (mobile safe center) */}
    <div className="w-full max-w-md mx-auto flex items-start sm:items-center justify-center">

      {/* Main card */}
      <div className="w-full glass-card backdrop-blur-xl p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl relative z-10 border border-white/10">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-2xl shadow-purple-500/30 animate-pulse-glow">
            <svg className="w-9 h-9 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            {mode === 'login' ? 'Welcome Back' : 'Join AI Coach'}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 px-2">
            {mode === 'login'
              ? 'Enter your credentials to access your dashboard'
              : 'Create account to unlock personalized career coaching'}
          </p>
        </div>

        {/* Error message */}
        {generalError && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-400/30 backdrop-blur-xl animate-pulse">
            <p className="text-red-300 font-medium text-sm sm:text-base">
              {generalError}
            </p>
          </div>
        )}

        {/* Mode tabs */}
        <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-1 mb-6 sm:mb-8 border border-white/10">
          <button
            onClick={() => toggleMode()}
            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 ${
              mode === 'login'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => toggleMode()}
            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
                <User className="w-4 h-4 text-purple-400 inline mr-2" />
                Full Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                  errors.name
                    ? 'border-red-400/50 bg-red-500/5'
                    : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                }`}
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              <Mail className="w-4 h-4 text-blue-400 inline mr-2" />
              Email Address
            </label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                errors.email
                  ? 'border-red-400/50 bg-red-500/5'
                  : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
              <Lock className="w-4 h-4 text-cyan-400 inline mr-2" />
              Password
            </label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                errors.password
                  ? 'border-red-400/50 bg-red-500/5'
                  : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
              }`}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Signup extras */}
          {mode === 'signup' && (
            <>
              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
                  <Lock className="w-4 h-4 text-orange-400 inline mr-2" />
                  Confirm Password
                </label>

                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                    errors.confirmPassword
                      ? 'border-red-400/50 bg-red-500/5'
                      : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                  }`}
                />

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Major */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
                  <GraduationCap className="w-4 h-4 text-emerald-400 inline mr-2" />
                  Major / Field
                </label>

                <input
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  placeholder="Computer Science"
                  className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                    errors.major
                      ? 'border-red-400/50 bg-red-500/5'
                      : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                  }`}
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
                  <BookOpen className="w-4 h-4 text-indigo-400 inline mr-2" />
                  Education
                </label>

                <input
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="bachelor's, master's, etc."
                  className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all glass-input ${
                    errors.education
                      ? 'border-red-400/50 bg-red-500/5'
                      : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                  }`}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 sm:mb-3">
                  <FileText className="w-4 h-4 text-yellow-400 inline mr-2" />
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className={`w-full p-4 sm:p-5 rounded-2xl border backdrop-blur-xl transition-all resize-none glass-input ${
                    errors.bio
                      ? 'border-red-400/50 bg-red-500/5'
                      : 'border-white/20 hover:border-purple-400/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30'
                  }`}
                />
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-6 sm:px-8 py-4 sm:py-5 rounded-3xl font-bold text-lg sm:text-xl"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

          {/* Toggle link */}
          <div className="mt-10 text-center">
            <p className={`text-gray-400 ${mode === 'signup' ? 'mb-0' : 'mb-2'}`}>
              {mode === 'login'
                ? "Don't have an account?"
                : "Already have an account?"
              }
            </p>
            <button
              onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 font-semibold text-lg hover:underline transition-colors"
              disabled={loading}
            >
              {mode === 'login' ? 'Sign up here' : 'Login instead'}
            </button>
          </div>
      </div>
    </div>
  </div>
);
};

export default Auth;
