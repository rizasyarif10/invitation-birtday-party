"use client";

import { useEffect, useRef, useState } from "react";
import { vibrate } from "@/features/invitation/utils/haptics";

const RESET_MS = 2_000;

export function CopyAddressButton({ address }: Readonly<{ address: string }>) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const resetRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetRef.current), []);

  const scheduleReset = () => {
    window.clearTimeout(resetRef.current);
    resetRef.current = window.setTimeout(() => {
      setCopied(false);
      setFailed(false);
    }, RESET_MS);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // Blocked by the browser (insecure context, or permission denied).
      setFailed(true);
      scheduleReset();
      return;
    }

    vibrate(10);
    setCopied(true);
    scheduleReset();
  };

  const label = failed
    ? "Copy failed"
    : copied
      ? "Address copied!"
      : "Copy address";

  return (
    <button
      type="button"
      onClick={copyAddress}
      className={`mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-black transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] active:translate-y-0.5 active:scale-[0.98] ${
        copied
          ? "border-[#7fa76a] bg-[#eff9e9] text-[#3f6f2b]"
          : "border-[#c96424] bg-[#fff8e9] text-[#8b3b12] hover:bg-[#f9e5c5]"
      }`}
    >
      <span
        aria-hidden="true"
        className={copied ? "animate-copy-check inline-block" : "inline-block"}
      >
        {copied ? "✓" : failed ? "✕" : "⧉"}
      </span>
      <span aria-live="polite">{label}</span>
    </button>
  );
}
