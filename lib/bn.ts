export function toBn(n: number, decimals?: number): string {
  return n.toLocaleString(
    "bn-BD",
    decimals === undefined
      ? undefined
      : { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
  );
}