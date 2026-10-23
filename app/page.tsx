import { Suspense } from "react";
import PriceTicker from '@/components/PriceTicker';
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import ProductListSkeleton from "@/components/ProductListSkeleton";


export default function Home() {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <Suspense fallback={<ProductListSkeleton />}>
      <PriceTicker />
       <HeroSection />
        <ProductList />
        
      </Suspense>
    </div>
  );
}