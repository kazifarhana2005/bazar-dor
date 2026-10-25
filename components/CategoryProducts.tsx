
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
};

export default function CategoryProducts({ products }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    switch (sortBy) {
      case "price-low":
        return result.sort(
          (a, b) => Number(a.today) - Number(b.today)
        );

      case "price-high":
        return result.sort(
          (a, b) => Number(b.today) - Number(a.today)
        );

      case "name":
        return result.sort((a, b) =>
          a.nameBn.localeCompare(b.nameBn, "bn")
        );

      default:
        return result;
    }
  }, [products, sortBy]);

  return (
    <section className="mt-4">
      {/* Sorting Bar */}
      <div className="flex min-h-[46px] items-center justify-end gap-2 rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] px-4 py-2">
        <label
          htmlFor="product-sort"
          className="text-[11px] text-[#778078]"
        >
          সাজান
        </label>

        <select
          id="product-sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="rounded-lg border border-[#d9e0da] bg-[#fbfdfb] px-2 py-1 text-[11px] text-[#303a32] outline-none focus:border-[#159447]"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
          <option value="name">নাম অনুযায়ী</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="mb-3 mt-3 text-[11px] text-[#788078]">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Existing Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#e1e9e2] bg-[#fbfdfb] px-4 py-10 text-center text-sm text-[#788078]">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
}
