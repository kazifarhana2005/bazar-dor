import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { unitBn } from "@/lib/format";

async function Details({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { nameBn, image, unit, today, yesterday, change, markets, category, categoryNameBn } = product;

  const diff = today - yesterday;
  const unitShort = unitBn(unit).replace("প্রতি ", "");
  const minPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : today;
  const maxPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : today;
  const fmt = (n: number) =>
    n.toLocaleString("bn-BD", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    });

  const badge =
    change.dir === "up"
      ? { icon: "▲", style: "bg-red-50 text-red-600" }
      : change.dir === "down"
        ? { icon: "▼", style: "bg-green-50 text-green-600" }
        : { icon: "―", style: "bg-gray-100 text-gray-500" };

  return (
    <div className="space-y-5">
      <nav className="text-xs text-gray-500">
        <Link href="/" className="hover:underline">হোম</Link>
        {" › "}
        <Link href={`/category/${category}`} className="hover:underline">{categoryNameBn}</Link>
        {" › "}
        <span className="text-gray-800">{nameBn}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-4xl">{image}</span>
          <div>
            <h1 className="text-2xl font-bold">{nameBn}</h1>
            <p className="text-xs text-gray-500">{unitBn(unit)} · {categoryNameBn}</p>
            <p className="mt-1 text-sm">
              {diff === 0 ? (
                "গতকালের তুলনায় দামের কোনো পরিবর্তন নেই"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম <b>{diff > 0 ? "বেড়েছে" : "কমেছে"}</b> · {toBn(Math.abs(diff))} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 px-6 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold">{toBn(today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unitShort}</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${badge.style}`}>
            {badge.icon} {toBn(Math.abs(change.pct))}%
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5">
        <h2 className="font-bold">দামের সারসংক্ষেপ</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-600">{toBn(minPrice)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-xl font-bold text-red-600">{toBn(maxPrice)} টাকা</p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-base-300 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold text-green-600">{toBn(today)} টাকা</p>
            <p className="text-xs text-gray-500">{unitBn(unit)}-এর হিসাবে</p>
          </div>
        </div>

        <h2 className="mt-6 font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-base-300">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">বাজার</th>
                <th className="px-4 py-3 font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m.market} className="border-t border-base-300">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">{fmt((m.min + m.max) / 2)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <main className="mx-auto w-full max-w-6xl p-4">
      <Suspense fallback={<div className="skeleton h-96 w-full rounded-2xl" />}>
        <Details params={params} />
      </Suspense>
    </main>
  );
}