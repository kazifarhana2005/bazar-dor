import { Suspense } from "react";
import CategoryContent from "@/components/CategoryContent";
import ProductListSkeleton from "@/components/ProductListSkeleton";

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <Suspense fallback={<ProductListSkeleton />}>
        <CategoryContent params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}