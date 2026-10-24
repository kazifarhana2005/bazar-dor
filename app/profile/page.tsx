'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [name, setName] = useState('Rezwan Ahmed');
  const [email, setEmail] = useState('rezwanahmed@gmail.com');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('প্রোফাইলের তথ্য আপডেট করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* হেডার / শিরোনাম */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* ইউজার প্রোফাইল কার্ড */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex-shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rezwan"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-800">{name}</h2>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs rounded-lg transition-colors font-medium"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            সাইন আউট
          </button>
        </div>

        {/* তথ্য পরিবর্তন ফরম */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="text-sm font-bold text-gray-800 mb-4">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:bg-white focus:border-green-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#058843] hover:bg-[#047238] text-white font-medium text-xs rounded-lg transition-colors shadow-xs mt-2"
            >
              আপডেট
            </button>
          </form>
        </div>

        {/* হোম পেজে ফিরে যাওয়ার লিংক */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}