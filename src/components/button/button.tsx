"use client";

import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";

import type { ButtonProps } from "./types";

const button = tv({
  base: "cursor-pointer shrink-0 md:w-max rounded text-neutral-50 uppercase bg-linear-to-r from-[#0A3A75] to-[#67A4EE] shadow-xl shadow-[#67A4EE30] transition-all disabled:pointer-events-none disabled:opacity-80",
  variants: {
    size: {
      sm: "text-xs font-semibold py-2.5 px-6 rounded-md hover:scale-105",
      base: "text-sm font-bold py-4 px-8 rounded-md shadow-xl hover:scale-110 lg:text-base lg:py-6 lg:px-11",
    },
  },
  defaultVariants: { size: "base" },
});

export function Button({
  asChild,
  className,
  size = "sm",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component {...props} className={button({ size, class: className })} />
  );
}
