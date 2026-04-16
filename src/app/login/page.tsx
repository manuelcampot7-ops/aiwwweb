"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message || 'Incorrect email or password. Please try again.');
      setLoading(false);
      return;
    }

    router.push('/dashboard/contacts');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed pointer-events-none rounded-full w-[50vw] h-[50vw] -right-[20%] -top-[20%] bg-red-500/[0.04] blur-[120px]" />
      <div className="fixed pointer-events-none rounded-full w-[40vw] h-[40vw] -left-[15%] -bottom-[15%] bg-red-500/[0.03] blur-[120px]" />

      <div className="w-full max-w-[420px] relative z-[1]">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="font-['Space_Grotesk'] font-extrabold text-[1.8rem] tracking-tight inline-block">
            <span className="bg-gradient-to-br from-red-500 to-red-700 bg-clip-text text-transparent">AI</span>WWWEB
          </a>
          <p className="text-gray-400 text-[0.9rem] mt-2">Client Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-red-500/[0.10] rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-8">
          <h1 className="font-['Space_Grotesk'] font-bold text-[1.4rem] text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-gray-400 text-[0.875rem] mb-7">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.9rem] text-gray-900 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.9rem] text-gray-900 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300"
              />
            </div>

            {error && (
              <div className="text-[0.82rem] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-3 rounded-xl font-bold text-[0.95rem] bg-gradient-to-br from-red-600 to-red-800 text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(220,38,38,0.25)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-[0.78rem] text-gray-400 mt-6">
          Need access?{' '}
          <a href="mailto:hello@aiwwweb.com" className="text-red-600 font-semibold hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
}
