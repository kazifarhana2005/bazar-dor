
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "সাইন আপ করা যায়নি।");
        return;
      }

      window.location.href = "/signin";
    } catch {
      setError("কোনো সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (
    provider: "google" | "github"
  ) => {
    setError("");

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      setError("আবার চেষ্টা করো।");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f7ed] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-7 text-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-[#247447]"
          >
           
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            সাইন আপ
          </h1>

          <p className="mt-2 text-base text-gray-600">
            তোমার অ্যাকাউন্ট তৈরি করতে তথ্য দাও
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-base font-semibold text-gray-800"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="তোমার নাম লিখো"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#247447] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base font-semibold text-gray-800"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#247447] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-base font-semibold text-gray-800"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition focus:border-[#247447] focus:ring-2 focus:ring-green-100"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#247447] px-4 py-3.5 text-base font-bold text-white transition hover:bg-[#1b5e39] disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করো..." : "সাইন আপ"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialSignup("google")}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
                <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/>
                <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/>
                <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
                <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.8 6.1-8.3 11.4-8.3Z"/>
              </svg>
              Google দিয়ে চালিয়ে যাও
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup("github")}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 text-base font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.4 3.7 1.7.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 .9-.3 3.1 1.1a10.8 10.8 0 0 1 5.7 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.2-5.1 5.5.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z"/>
              </svg>
              GitHub দিয়ে চালিয়ে যাও
            </button>
          </div>

          <p className="mt-7 text-center text-base text-gray-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-bold text-[#247447] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Bazar Dor — প্রতিদিনের বাজারদর, এক নজরে।
        </p>
      </div>
    </main>
  );
}