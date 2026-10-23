import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import ProductListSkeleton from "@/components/ProductListSkeleton";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}