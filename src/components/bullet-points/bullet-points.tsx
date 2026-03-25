import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";

import type { BulletPointsProps } from "./types";

export function BulletPoints({
  itemsPerColumn,
  variant,
  items,
  className,
}: BulletPointsProps) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? item : item.text
  );

  const columns: string[][] = [];

  for (let i = 0; i < normalizedItems.length; i += itemsPerColumn) {
    columns.push(normalizedItems.slice(i, i + itemsPerColumn));
  }

  const Icon = variant === "check" ? CheckIcon : XIcon;

  return (
    <div
      className={twMerge("grid grid-cols-1 gap-6 md:grid-cols-2", className)}
    >
      {columns.map((column, colIndex) => (
        <ul key={colIndex} className="m-0 flex list-none flex-col gap-6 p-0">
          {column.map((text, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <span
                className={twMerge(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-linear-to-r",
                  variant === "check" && "from-[#0A3A75] to-[#67A4EE]",
                  variant === "x" && "from-[#750A0A] to-[#EE6767]"
                )}
              >
                <Icon size={14} className="text-neutral-50" />
              </span>

              <span>{text}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
