"use client";

import { useRef } from "react";

import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";

import type { SwiperCardProps } from "./types";

export default function SwiperCard({ items }: SwiperCardProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      loop
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
      }}
      className="w-full"
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="group relative flex h-100 cursor-grab flex-col justify-end overflow-hidden rounded-md">
            <Image
              src="/assets/card-example.webp"
              alt="Imagem"
              width={280}
              height={280}
              className="pointer-events-none absolute -z-20 h-full w-full object-cover object-top transition-transform duration-700 select-none group-hover:scale-105"
            />

            <div className="absolute bottom-0 -z-10 h-full w-full bg-linear-to-b to-black" />

            <div className="flex flex-col gap-1 p-6">
              <h4 className="text-xl font-semibold">
                <span>Módulo {index + 1}.</span>
                <br />
                <span>{item.title}</span>
              </h4>

              <p
                className="font-medium text-neutral-400"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
