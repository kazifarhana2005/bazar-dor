import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="light" className="h-full antialiased">
      <body
        className={`${hind.className} min-h-full flex flex-col bg-[#f1f6f1] text-[#1a1a1a]`}
      >
        <Suspense fallback={<div className="h-24 bg-white" />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="h-10 bg-white" />}>
          <Ticker />
        </Suspense>
        {children}
      </body>
    </html>
  );
}