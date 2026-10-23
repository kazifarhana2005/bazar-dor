"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function CategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <nav className="mx-auto max-w-6xl overflow-x-auto px-4">
      <ul className="flex gap-2 whitespace-nowrap pb-2">
        {categories.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;
          return (
            <li key={c.slug}>
              <Link
                href={href}
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm ${
                  active
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50"
                }`}
              >
                <span>{c.icon}</span>
                {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}