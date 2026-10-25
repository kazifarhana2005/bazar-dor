
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.92 46.98 31.77 46.98 24.55Z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -2)"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.77 2.38 3.48 1.68.1-.73.4-1.23.7-1.51-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.06 1.15a10.6 10.6 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.12 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/>
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setErrorMessage("লগইন করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setErrorMessage("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Social login করা যায়নি।");
        setSocialLoading("");
      }
    } catch {
      setErrorMessage("লগইন করা যায়নি। আবার চেষ্টা করো।");
      setSocialLoading("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <section className="w-full max-w-[440px]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#26352a]">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#788078]">
            বিস্তারিত দাম, বাজার তথ্য ও প্রয়োজনীয় সেবা দেখতে লগইন করুন।
          </p>
        </header>

        <div className="rounded-xl border border-[#e4ebe4] bg-[#fcfdfc] p-5 sm:p-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#344037]">
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-[#e1e8e1] bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#344037]">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-md border border-[#e1e8e1] bg-white px-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            {errorMessage && (
              <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !!socialLoading}
              className="h-11 w-full rounded-md bg-[#078b45] text-sm font-semibold text-white shadow-sm transition hover:bg-[#06783b] disabled:opacity-60"
            >
              {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e7ece7]" />
            <span className="text-xs text-[#858d85]">অথবা</span>
            <div className="h-px flex-1 bg-[#e7ece7]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleSocialSignIn("google")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#e1e7e1] bg-white px-3 py-2 text-sm font-medium text-[#39433b] transition hover:bg-gray-50 disabled:opacity-60"
            >
              <GoogleIcon />
              <span>{socialLoading === "google" ? "অপেক্ষা করো..." : "Google দিয়ে লগইন"}</span>
            </button>

            <button
              type="button"
              disabled={loading || !!socialLoading}
              onClick={() => handleSocialSignIn("github")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#e1e7e1] bg-white px-3 py-2 text-sm font-medium text-[#39433b] transition hover:bg-gray-50 disabled:opacity-60"
            >
              <GitHubIcon />
              <span>{socialLoading === "github" ? "অপেক্ষা করো..." : "GitHub দিয়ে লগইন"}</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-[#737d74]">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="font-semibold text-[#078b45] hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-[#879087]">
          ← <Link href="/" className="hover:text-green-700">হোম পেজে ফিরে যান</Link>
        </p>
      </section>
    </main>
  );
}
