const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  l: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  doz: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  pc: "প্রতি পিস",
};

export function unitBn(unit: string): string {
  return units[unit.toLowerCase()] ?? unit;
}