import Link from "next/link";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";
import { getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bn";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="mt-1 text-sm text-gray-500">
          এই ক্যাটাগরিতে কিছু নেই বা ঠিকানাটি ভুল।
        </p>
        <Link
          href="/"
          className="btn mt-6 border-0 bg-green-600 text-white hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const sorted = [...products];
  if (sort === "low") sorted.sort((a, b) => a.today - b.today);
  if (sort === "high") sorted.sort((a, b) => b.today - a.today);

  const { categoryNameBn, categoryIcon } = products[0];

  return (
    <>
      <div className="flex items-center gap-4 rounded-2xl bg-white p-5">
        <span className="text-4xl">{categoryIcon}</span>
        <div>
          <h1 className="text-2xl font-bold">{categoryNameBn}</h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end rounded-2xl bg-white p-4">
        <SortSelect />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}