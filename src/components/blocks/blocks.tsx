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
        "grid w-full grid-cols-1 gap-6 md:grid-cols-2",
        className
      )}
    >
      {columns.map((column, colIndex) => (
        <ul key={colIndex} className="m-0 flex list-none flex-col gap-6 p-0">
          {column.map((text, itemIndex) => (
            <li
              key={itemIndex}
              className="flex w-full items-start gap-3 rounded-[0.625rem] border border-[#0A3A75] bg-[#2358F507] px-6 py-4"
            >
              <span className="w-full text-center font-semibold">{text}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
