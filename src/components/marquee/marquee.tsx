"use client";

import { twMerge } from "tailwind-merge";

import { MarqueeProps } from "./types";

export function Marquee({ text, repeat = 10, className }: MarqueeProps) {
  const items = Array.from({ length: repeat });

  return (
    <div
      className={twMerge(
        "flex w-full gap-8 overflow-hidden border-t border-b border-neutral-900 py-6",
        className
      )}
    >
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-6">
        {items.map((_, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2">
            <span className="pointer-events-none shrink-0 bg-linear-to-r from-[#67A4EE] to-[#154783] bg-clip-text text-transparent select-none">
              ✦
            </span>
            <span className="pointer-events-none text-xs font-semibold whitespace-nowrap uppercase select-none">
              {text}
            </span>
          </span>
        ))}
      </div>

      <div
        className="flex min-w-full shrink-0 animate-marquee items-center gap-4"
        aria-hidden
      >
        {items.map((_, i) => (
          <span key={i} className="flex shrink-0 items-center gap-4">
            <span className="pointer-events-none shrink-0 bg-linear-to-r from-[#67A4EE] to-[#154783] bg-clip-text text-transparent select-none">
              ✦
            </span>
            <span className="pointer-events-none text-xs font-semibold whitespace-nowrap uppercase select-none">
              {text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
