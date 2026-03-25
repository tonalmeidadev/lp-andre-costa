"use client";

import { useRef } from "react";

import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { twMerge } from "tailwind-merge";

import "swiper/css";

import { trackEvent } from "@/utils/track-event";

import type { TestimonialCarouselProps } from "./types";

export function TestimonialCarousel({
  items,
  className,
}: TestimonialCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const loopedItems = [...items, ...items, ...items];

  return (
    <div className={twMerge("relative w-full", className)}>
      <div className="pointer-events-none absolute top-0 left-0 z-10 hidden h-full w-32 bg-linear-to-r from-[#100E10] to-transparent sm:block" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 hidden h-full w-32 bg-linear-to-l from-[#100E10] to-transparent sm:block" />

      <Swiper
        loop
        centeredSlides
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() =>
          trackEvent("carousel_slide", { location: "testimonials_carousel" })
        }
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={1.08}
        spaceBetween={24}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2.08 },
        }}
        className="w-full items-stretch"
      >
        {loopedItems.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="flex h-full cursor-grab flex-col justify-between gap-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-8">
              <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      size={20}
                      weight={i < item.rating ? "fill" : "regular"}
                      className={
                        i < item.rating ? "text-yellow-400" : "text-neutral-600"
                      }
                    />
                  ))}
                </div>

                <p className="text-neutral-200 italic select-none">
                  &quot;{item.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="font-bold select-none">
                    {item.author.name}
                  </span>
                  <span className="text-sm text-neutral-400 select-none">
                    {item.author.locale}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
