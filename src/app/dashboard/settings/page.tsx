"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail]         = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm]     = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [pwError, setPwError]     = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);
    };
    loadUser();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (newPassword.length < 8) {
      setPwError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirm) {
      setPwError('Passwords do not match.');
      return;
    }

    setPwLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPwError('Could not update password. Please try again.');
    } else {
      setPwSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirm('');
    }
    setPwLoading(false);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-['Space_Grotesk'] font-extrabold text-[1.6rem] text-gray-900 mb-1">
          Settings
        </h1>
        <p className="text-[0.9rem] text-gray-400">Manage your account preferences</p>
      </div>

      <div className="flex flex-col gap-5 max-w-[560px]">
        {/* Email */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7">
          <p className="text-[0.75rem] font-bold tracking-[2px] uppercase text-gray-400 mb-5">
            Account Email
          </p>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400 text-sm">✉️</span>
            <span className="text-[0.9rem] font-medium text-gray-700">{email || '—'}</span>
          </div>
          <p className="text-[0.78rem] text-gray-400 mt-2.5">
            To change your email, contact{' '}
            <a href="mailto:hello@aiwwweb.com" className="text-red-600 hover:underline font-semibold">
              hello@aiwwweb.com
            </a>
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7">
          <p className="text-[0.75rem] font-bold tracking-[2px] uppercase text-gray-400 mb-5">
            Change Password
          </p>

          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
                New password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.875rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-[0.8rem] font-semibold text-gray-600 mb-1.5">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[0.875rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-500/10 placeholder:text-gray-300"
              />
            </div>

            {pwError && (
              <p className="text-[0.82rem] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {pwError}
              </p>
            )}
            {pwSuccess && (
              <p className="text-[0.82rem] text-green-700 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                {pwSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={pwLoading}
              className="py-3 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white font-bold text-[0.875rem] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(220,38,38,0.25)] transition-all duration-300 disabled:opacity-60"
            >
              {pwLoading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Danger zone */}
        <div className="bg-white border border-gray-100 rounded-2xl p-7">
          <p className="text-[0.75rem] font-bold tracking-[2px] uppercase text-gray-400 mb-5">
            Session
          </p>
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl border border-red-200 text-red-600 text-[0.875rem] font-semibold hover:bg-red-50 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
