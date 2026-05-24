import React, { useState } from 'react';
import { X, Lock, Mail, User, Smile } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user;
      if (isLogin) {
        user = await api.login(email.trim(), password);
      } else {
        const cleanUsername = username.trim().replace(/^@/, '');
        user = await api.signup(fullName.trim(), cleanUsername, email.trim(), password);
      }
      onAuthSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = isLogin
    ? (email.trim() !== '' && password.trim() !== '')
    : (fullName.trim() !== '' && username.trim() !== '' && email.trim() !== '' && password.trim() !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl font-bold text-primary tracking-tight">Lumora</h2>
            <p className="mt-2 text-sm text-neutral-500 font-medium">
              {isLogin ? 'Sign in to create, like, and save inspirations' : 'Join our creative aesthetic community'}
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="Evelyn Thorne"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Username</label>
                  <div className="relative">
                    <Smile className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder="@evelyn_curates"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="evelyn@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 py-3 pl-11 pr-12 text-sm outline-none focus:border-primary/50 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                />
                
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bulletproof Solid Submit Button */}
            <button
              type="submit"
              disabled={loading || !canSubmit}
              style={{
                backgroundColor: (loading || !canSubmit) ? '#e5e7eb' : '#30578f',
                color: (loading || !canSubmit) ? '#9ca3af' : '#ffffff',
                border: (loading || !canSubmit) ? '1px solid #d1d5db' : 'none',
                cursor: (loading || !canSubmit) ? 'not-allowed' : 'pointer'
              }}
              className="mt-3 w-full rounded-2xl py-3.5 text-sm font-bold shadow-md hover:opacity-95 active:scale-[0.98] transition-all"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Test Credentials Helper */}
          {isLogin && (
            <p className="text-[11px] text-neutral-400 text-center font-medium mt-3.5 leading-normal">
              Seed accounts password is <span className="font-bold text-neutral-500">demo12345</span>
            </p>
          )}

          <div className="mt-5 border-t border-neutral-100 pt-5 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-xs font-bold text-neutral-600 hover:text-primary transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
