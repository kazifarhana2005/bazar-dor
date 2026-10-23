import type { Product } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("পণ্যের ডেটা আনা যায়নি");
  return res.json();
}