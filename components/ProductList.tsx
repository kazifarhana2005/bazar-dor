import ProductSection from "./ProductSection";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function ProductList() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <ProductSection title="আজ দাম বেড়েছে ▲" products={risers} />
      <ProductSection title="আজ দাম কমেছে ▼" products={fallers} />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}