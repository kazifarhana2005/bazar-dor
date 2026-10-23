import Link from "next/link";
import { getCategories } from "@/lib/api";
import CategoryLinks from "./CategoryLinks";

export default async function Navbar() {
  const categories = await getCategories();
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="border-b border-base-300 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-xl">
            🛒
          </span>
          <div>
            <p className="font-bold leading-tight">বাজার দর</p>
            <p className="text-xs text-gray-500">{today}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm">
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="btn btn-sm border-0 bg-green-600 text-white hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

    
    </header>
  );
}