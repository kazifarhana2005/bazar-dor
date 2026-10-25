import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const badge =
    change.dir === "up"
      ? { icon: "▲", style: "bg-red-50 text-red-600" }
      : change.dir === "down"
        ? { icon: "▼", style: "bg-green-50 text-green-600" }
        : { icon: "―", style: "bg-gray-100 text-gray-500" };

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${badge.style}`}
    >
      {badge.icon} {toBn(Math.abs(change.pct))}%
    </span>
  );
}