"use client";

import { twMerge } from "tailwind-merge";

import { MarqueeProps } from "./types";

export function Marquee({ text, repeat = 15, className }: MarqueeProps) {
  const items = Array.from({ length: repeat });

  const renderItems = (keyPrefix: string) =>
    items.map((_, i) => (
      <span
        key={`${keyPrefix}-${i}`}
        className="flex shrink-0 items-center gap-2 px-6"
      >
        <span className="pointer-events-none shrink-0 bg-linear-to-r from-[#67A4EE] to-[#154783] bg-clip-text text-transparent select-none">
          ✦
        </span>
        <span className="pointer-events-none text-xs font-semibold whitespace-nowrap uppercase select-none">
          {text}
        </span>
      </span>
    ));

  return (
    <div
      className={twMerge(
        "group overflow-hidden border-t border-b border-neutral-900 py-6",
        className
      )}
    >
      <div className="flex w-fit animate-marquee items-center group-hover:[animation-play-state:paused]">
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
}
