"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { twMerge } from "tailwind-merge";

import { trackEvent } from "@/utils/track-event";

import type { AccordionProps } from "./types";

export function Accordion({ items, className }: AccordionProps) {
  return (
    <RadixAccordion.Root
      collapsible
      type="single"
      defaultValue="item-0"
      className={twMerge("w-full", className)}
      onValueChange={(value) => {
        if (value) {
          const index = parseInt(value.replace("item-", ""));
          trackEvent("accordion_open", {
            question: items[index]?.question,
            location: "faq",
          });
        }
      }}
    >
      {items.map((item, index) => (
        <RadixAccordion.Item
          key={index}
          defaultValue="item-0"
          value={`item-${index}`}
          className="border-b border-neutral-700"
        >
          <RadixAccordion.Trigger className="group flex w-full cursor-pointer items-center justify-between py-6 text-left font-semibold transition-colors duration-200">
            <span className="bg-linear-to-r from-white to-white bg-clip-text text-transparent group-data-[state=open]:from-[#67A4EE] group-data-[state=open]:to-[#154783]">
              {item.question}
            </span>

            <span className="shrink-0 pl-6 text-neutral-400 group-data-[state=open]:text-blue-400">
              <PlusIcon
                size={20}
                className="block group-data-[state=open]:hidden"
              />
              <MinusIcon
                size={20}
                className="hidden group-data-[state=open]:block"
              />
            </span>
          </RadixAccordion.Trigger>

          <RadixAccordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="pb-4 text-neutral-400">{item.answer}</p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
