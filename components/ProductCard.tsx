import { toBn } from "@/lib/bn";
import { unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { nameBn, image, unit, today, change } = product;

  const badge =
    change.dir === "up"
      ? { icon: "▲", style: "bg-red-50 text-red-600" }
      : change.dir === "down"
        ? { icon: "▼", style: "bg-green-50 text-green-600" }
        : { icon: "―", style: "bg-gray-100 text-gray-500" };

  return (
    <div className="rounded-xl border border-base-300 bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{image}</span>
        <div>
          <h3 className="font-bold">{nameBn}</h3>
          <p className="text-xs text-gray-500">{unitBn(unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="font-bold">{toBn(today)} টাকা</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badge.style}`}
        >
          {badge.icon} {toBn(Math.abs(change.pct))}%
        </span>
      </div>
    </div>
  );
}