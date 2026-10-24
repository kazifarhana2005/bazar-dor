import type { Category, Product } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("পণ্যের ডেটা আনা যায়নি");
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const products = await getProducts();
  const map = new Map<string, Category>();

  for (const p of products) {
    if (!map.has(p.category)) {
      map.set(p.category, {
        slug: p.category,
        nameBn: p.categoryNameBn,
        icon: p.categoryIcon,
      });
    }
  }
  return [...map.values()];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${BASE}/products?category=${encodeURIComponent(slug)}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}