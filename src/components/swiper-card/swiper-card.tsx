"use client";

import { useRef } from "react";

import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import "swiper/css";
import Image from "next/image";

import type { SwiperCardProps } from "./types";

export function SwiperCard({ items, className }: SwiperCardProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const loopedItems = [...items, ...items, ...items];

  return (
    <div className={twMerge("relative w-full", className)}>
      <div className="pointer-events-none absolute top-0 left-0 z-10 hidden h-full w-32 bg-linear-to-r from-[#100E10] to-transparent md:block" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 hidden h-full w-32 bg-linear-to-l from-[#100E10] to-transparent md:block" />

      <Swiper
        loop
        centeredSlides
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1.08}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1.25 },
          1024: { slidesPerView: 1.75 },
          1280: { slidesPerView: 2 },
          1536: { slidesPerView: 2.5 },
        }}
        className="w-full"
      >
        {loopedItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="group relative cursor-grab overflow-hidden rounded-md">
              <Image
                src={item.imageUrl}
                alt="Imagem"
                width={280}
                height={280}
                className="pointer-events-none w-full object-cover object-top transition-transform duration-700 select-none group-hover:scale-105"
              />

              {/* <div className="absolute bottom-0 z-10 h-1/2 w-full bg-linear-to-b to-black opacity-0 transition-opacity group-hover:opacity-100" /> */}

              <div className="z-20 flex flex-col gap-1 bg-neutral-900 p-[3.5vw] md:p-[2.75vw] lg:p-[2vw] xl:p-[1.75vw] 2xl:p-[1.5vw]">
                <h4 className="font-medium">{item.description}</h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
