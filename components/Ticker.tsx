import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { unitBn } from "@/lib/format";

export default async function Ticker() {
  const products = await getProducts();

  const items = products.map((p) => {
    const unit = unitBn(p.unit).replace("প্রতি ", "");
    const { dir, pct } = p.change;
    const color =
      dir === "up"
        ? "text-red-600"
        : dir === "down"
          ? "text-green-600"
          : "text-gray-500";
    const icon = dir === "up" ? "▲" : dir === "down" ? "▼" : "―";

    return (
      <span
        key={p.id}
        className="mx-4 inline-flex items-center gap-2 whitespace-nowrap text-sm"
      >
        <span>{p.image}</span>
        <span className="font-medium">{p.nameBn}</span>
        <span className="text-gray-600">
          {toBn(p.today)} টাকা/{unit}
        </span>
        <span className={color}>
          {icon} {toBn(Math.abs(pct))}%
        </span>
      </span>
    );
  });

  return (
    <div className="marquee overflow-hidden border-b border-base-300 bg-white py-2">
      <div className="marquee-track">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}