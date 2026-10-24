"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "default";

  function handleChange(value: string) {
    router.replace(value === "default" ? pathname : `${pathname}?sort=${value}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      সাজান
      <select
        className="select select-bordered select-sm bg-white"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}