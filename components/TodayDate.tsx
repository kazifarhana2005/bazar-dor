"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

function getServerSnapshot() {
  return "";
}

export default function TodayDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span className={className}>{text || "\u00A0"}</span>;
}