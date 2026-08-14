import { useEffect, useState } from "react";
import { EVENT_DATE } from "@/features/invitation/config/event";

const EMPTY_COUNTDOWN = [
  { value: "--", label: "Hari" },
  { value: "--", label: "Jam" },
  { value: "--", label: "Menit" },
  { value: "--", label: "Detik" },
];

function calculateCountdown() {
  const distance = Math.max(0, EVENT_DATE.getTime() - Date.now());
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance / 3_600_000) % 24);
  const minutes = Math.floor((distance / 60_000) % 60);
  const seconds = Math.floor((distance / 1_000) % 60);

  return [
    { value: String(days).padStart(2, "0"), label: "Hari" },
    { value: String(hours).padStart(2, "0"), label: "Jam" },
    { value: String(minutes).padStart(2, "0"), label: "Menit" },
    { value: String(seconds).padStart(2, "0"), label: "Detik" },
  ];
}

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(EMPTY_COUNTDOWN);

  useEffect(() => {
    const initialTimer = window.setTimeout(
      () => setTimeLeft(calculateCountdown()),
      0,
    );
    const timer = window.setInterval(
      () => setTimeLeft(calculateCountdown()),
      1_000,
    );
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  return timeLeft;
}
