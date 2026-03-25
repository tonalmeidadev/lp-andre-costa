"use client";

import { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";

import type { CountdownTimerProps } from "./types";

const STORAGE_KEY = "countdown_expires_at";
const EXPIRED_KEY = "countdown_expired";

function getOrCreateExpiresAt(duration: number): number {
  const expired = localStorage.getItem(EXPIRED_KEY);

  if (expired === "true") return 0;

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    const expiresAt = parseInt(stored, 10);

    if (expiresAt > Date.now()) return expiresAt;
  }

  const expiresAt = Date.now() + duration * 1000;

  localStorage.setItem(STORAGE_KEY, String(expiresAt));

  return expiresAt;
}

function getTimeLeft(expiresAt: number) {
  const diff = Math.max(0, expiresAt - Date.now());
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { minutes, seconds, done: diff === 0 };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  const digits = String(value).padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1">
        {digits.map((digit, i) => (
          <div
            key={i}
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-blue-400/30 bg-blue-400/7 shadow-2xl shadow-blue-400/30 transition-all duration-200"
          >
            <span className="font- text-xl font-bold text-neutral-50 tabular-nums transition-all duration-200">
              {digit}
            </span>
          </div>
        ))}
      </div>

      <span className="mt-1 text-[0.625rem] font-bold tracking-widest text-neutral-400 uppercase">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-sm leading-10 text-neutral-400 transition-all duration-200">
      :
    </span>
  );
}

export function CountdownTimer({
  duration,
  variant = "blocks",
  className,
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    const expiresAt = getOrCreateExpiresAt(duration);

    setTimeLeft(getTimeLeft(expiresAt));
    setMounted(true);

    if (expiresAt === 0) return;

    const interval = setInterval(() => {
      const tl = getTimeLeft(expiresAt);

      setTimeLeft(tl);

      if (tl.done) {
        localStorage.setItem(EXPIRED_KEY, "true");
        localStorage.removeItem(STORAGE_KEY);

        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  if (!mounted) return null;

  if (variant === "text") {
    return (
      <span
        className={twMerge(
          "text-lg font-semibold text-[#67A4EE] tabular-nums",
          className
        )}
      >
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className={twMerge("flex gap-1", className)}>
      <TimeBlock value={timeLeft.minutes} label="Minutos" />
      <Separator />
      <TimeBlock value={timeLeft.seconds} label="Segundos" />
    </div>
  );
}
