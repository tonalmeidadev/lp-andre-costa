import { twMerge } from "tailwind-merge";

import Image from "next/image";

import type { HeroProps } from "./types";

export function Hero({ headline, description }: HeroProps) {
  return (
    <section className="relative flex h-220 w-full items-end justify-center overflow-hidden xxs:h-230 xs:h-240">
      <Image
        src="/assets/background.webp"
        alt="Imagem"
        width={1920}
        height={925}
        className="pointer-events-none absolute -z-30 h-full w-full object-cover select-none"
      />

      <Image
        src="/assets/photo.webp"
        alt="Imagem"
        width={625}
        height={637}
        className="pointer-events-none absolute top-8 -z-20 select-none md:top-16"
      />

      <div className="absolute top-0 -z-10 h-10 w-full bg-linear-to-b from-[#100E10] from-55% to-[#100E10]/0 lg:h-14" />
      <div className="absolute bottom-0 -z-10 h-3/4 w-full bg-linear-to-t from-[#100E10] from-55% to-[#100E10]/0 xxs:h-[70%] xs:h-[60%] sm:h-[55%] md:h-1/2" />

      <div className="flex w-full max-w-240 flex-col gap-9 px-4 pb-20">
        <h1
          dangerouslySetInnerHTML={{ __html: headline }}
          className={twMerge(
            "text-center text-4xl font-medium",
            "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
            "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
          )}
        />

        <span className="text-center">{description}</span>
      </div>
    </section>
  );
}
