import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { toBn } from "@/lib/bn";
import { unitBn } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { slug, nameBn, image, unit, today, change } = product;

  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-xl border border-base-300 bg-white p-4 transition hover:shadow-md"
    >
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
        <ChangeBadge change={change} />
      </div>
    </Link>
  );
}