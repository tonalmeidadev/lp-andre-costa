import { twMerge } from "tailwind-merge";

import type { BlocksProps } from "./types";

export function Blocks({ itemsPerColumn, items, className }: BlocksProps) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? item : item.text
  );

  const columns: string[][] = [];

  for (let i = 0; i < normalizedItems.length; i += itemsPerColumn) {
    columns.push(normalizedItems.slice(i, i + itemsPerColumn));
  }

  return (
    <div
      className={twMerge(
        "grid w-full grid-cols-1 gap-2 md:grid-cols-2 md:gap-6",
        className
      )}
    >
      {columns.map((column, colIndex) => (
        <ul
          key={colIndex}
          className="m-0 flex list-none flex-col gap-2 p-0 md:gap-3"
        >
          {column.map((text, itemIndex) => (
            <li
              key={itemIndex}
              className="flex h-20 w-full items-center gap-3 rounded-[0.625rem] border border-blue-500/30 bg-[#2358F507] px-6 shadow-2xl shadow-blue-500/10"
            >
              <span className="w-full text-center font-semibold">{text}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
