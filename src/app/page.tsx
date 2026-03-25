"use client";

import { useState } from "react";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";

import Image from "next/image";
import Link from "next/link";

import { Accordion } from "@/components/accordion/accordion";
import { Blocks } from "@/components/blocks/blocks";
import { BulletPoints } from "@/components/bullet-points/bullet-points";
import { ButtonSecure } from "@/components/button-secure/button-secure";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/marquee/marquee";
import SwiperCard from "@/components/swiper-card/swiper-card";
import { TestimonialCarousel } from "@/components/testimonial/testimonial";
import { VSL } from "@/components/vsl/vsl";
import { page } from "@/constants/page";

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="flex flex-col items-center">
      {!unlocked && (
        <section className="flex w-full max-w-240 flex-col items-center gap-4 px-8 pt-16 pb-8">
          <h1
            dangerouslySetInnerHTML={{ __html: page.zero.headline.html }}
            className={twMerge(
              "text-center text-4xl font-medium",
              "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
              "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
            )}
          />

          <span className="text-center">{page.zero.description}</span>
        </section>
      )}

      {unlocked && (
        <section className="flex w-full max-w-300 flex-col items-center gap-4 px-8 py-8">
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="size-2.5 animate-pulse rounded-full bg-red-500" />
              <span className="font-semibold uppercase">
                {page.one.conditionText}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <span className="text-center sm:text-start">
                {page.one.description}
              </span>

              <span className="hidden sm:block">—</span>

              <Link
                href="/"
                className="flex items-center gap-1 text-[#67A4EE] underline"
              >
                <span>{page.one.cta}</span>
                <ArrowUpRightIcon />
              </Link>
            </div>
          </div>
        </section>
      )}

      <VSL
        videoId={page.two.vsl.videoId}
        unlockAt={page.two.vsl.unlockAt}
        onUnlock={() => setUnlocked(true)}
      />

      {unlocked && (
        <>
          <section className="flex w-full max-w-240 flex-col items-center gap-6 px-8 pb-8">
            <div className="flex items-center gap-2.5 rounded-3xl border border-[#FF4848] px-8 py-3">
              <div className="size-2.5 animate-pulse rounded-full bg-[#FF4848]" />
              <span className="text-sm font-semibold text-[#FF4848] uppercase">
                {page.three.ctaRed}
              </span>
            </div>

            <h3 className="text-center text-2xl font-semibold">
              {page.three.subdescription}
            </h3>

            <ButtonSecure text={page.three.cta} />
          </section>

          <Hero
            headline={page.four.headline.html}
            description={page.four.description}
          />

          <Marquee text={page.six.marqueeText} />

          <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
            <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
              {page.five.title}
            </h2>

            <span className="mb-6 text-center">{page.five.description}</span>

            <BulletPoints
              itemsPerColumn={page.five.bullets.itemsPerColumn}
              variant={page.five.bullets.variant}
              items={page.five.bullets.items}
              className="mb-12"
            />

            <ButtonSecure text={page.five.cta} />
          </section>

          <section className="flex w-full flex-col items-center py-8 md:py-16">
            <div className="flex max-w-240 flex-col px-8">
              <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
                {page.seven.title}
              </h2>

              <span
                className="mb-6 text-center"
                dangerouslySetInnerHTML={{ __html: page.seven.description }}
              />

              <h3 className="text-center text-2xl font-semibold">
                {page.seven.subdescription}
              </h3>
            </div>

            <div className="mt-12 flex w-full max-w-300 flex-col px-8">
              <SwiperCard items={page.seven.cards.items} />
            </div>
          </section>

          <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
            <h2 className="mb-12 text-center text-4xl font-medium -tracking-wide">
              {page.eight.title}
            </h2>

            {page.eight.bullets.map((item, index) => (
              <div key={index} className="flex w-full flex-col gap-6">
                {item?.description && (
                  <span className="mb-6 text-center">{item.description}</span>
                )}

                <BulletPoints
                  itemsPerColumn={item.bullets.itemsPerColumn}
                  variant={item.bullets.variant}
                  items={item.bullets.items}
                  className="mb-12"
                />
              </div>
            ))}

            <h3 className="mb-12 text-center text-2xl font-semibold -tracking-wide">
              {page.eight.blocks.title}
            </h3>

            {page.eight.blocks.items.map((item, index) => (
              <div key={index} className="flex w-full flex-col gap-6">
                <Blocks
                  itemsPerColumn={item.bullets.itemsPerColumn}
                  items={item.bullets.items}
                  className="mb-12"
                />
              </div>
            ))}

            <div className="flex w-full max-w-240 flex-col">
              <div className="mb-6 flex items-center gap-4 rounded-[0.625rem] border border-[#F5A62325] bg-[#F5A62307] px-6 py-4">
                <span className="text-2xl text-[#F5A623]">⚡</span>
                <span className="font-semibold text-[#F5A623]">
                  {page.eight.ctaCard}
                </span>
              </div>

              <ButtonSecure text={page.eight.cta} />
            </div>
          </section>

          <section className="flex w-full max-w-300 flex-col items-center px-8 py-8 md:py-16">
            <div className="grid w-full grid-cols-2 items-center gap-8">
              <h2 className="mb-12 max-w-100 text-4xl font-medium -tracking-wide">
                {page.nine.title}
              </h2>

              <span className="mb-6">{page.nine.description}</span>
            </div>

            <TestimonialCarousel items={page.nine.testimonials.cards.items} />
          </section>

          <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
            <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
              {page.ten.title}
            </h2>

            <span className="mb-6 text-center">{page.ten.description}</span>

            {page.ten.sections.map((item, index) => (
              <div key={index} className="flex flex-col gap-6">
                <h3 className="text-center text-2xl font-semibold">
                  {item.subdescription}
                </h3>

                <BulletPoints
                  itemsPerColumn={item.bullets.itemsPerColumn}
                  variant={item.bullets.variant}
                  items={item.bullets.items}
                  className="mb-12"
                />
              </div>
            ))}

            <ButtonSecure text={page.ten.cta} />
          </section>

          <section className="relative flex h-fit w-full items-end justify-center overflow-hidden py-8 md:py-16">
            <Image
              src={page.eleven.biography.backgroundUrl}
              alt="Foto de André Costa"
              width={1920}
              height={925}
              className="pointer-events-none absolute -z-30 h-full w-full object-cover select-none"
            />

            <div className="absolute bottom-0 -z-10 h-1/2 w-full bg-linear-to-t from-[#100E10] to-[#100E10]/0" />
            <div className="absolute top-0 -z-10 h-1/2 w-full bg-linear-to-b from-[#100E10] to-[#100E10]/0" />

            <div className="flex w-full max-w-160 flex-col items-center gap-12 px-8 lg:max-w-240 lg:flex-row">
              <Image
                src={page.eleven.biography.photoUrl}
                alt="Imagem"
                width={438}
                height={572}
                className="pointer-events-none size-80 shrink-0 rounded-full object-cover object-top-right select-none xs:size-100 lg:order-1 lg:size-[inherit] lg:h-142 lg:w-108 lg:rounded-lg"
              />

              <div className="flex flex-col items-center gap-4 lg:items-start">
                <h2 className="w-fit bg-linear-to-r from-[#67A4EE] to-[#9EC042] bg-clip-text text-center text-4xl font-medium text-transparent lg:text-left">
                  {page.eleven.biography.name}
                </h2>

                <div
                  className="text-center lg:text-left"
                  dangerouslySetInnerHTML={{
                    __html: page.eleven.biography.bio.html,
                  }}
                />
              </div>
            </div>
          </section>

          <section className="flex w-full justify-center bg-linear-to-r from-[#121315] via-[#12131500] to-[#121315] py-16">
            <div className="flex max-w-300 flex-col items-center justify-between gap-16 px-8 lg:flex-row">
              <div className="flex flex-col gap-4">
                <h2 className="text-center text-2xl font-semibold lg:text-left">
                  {page.twelve.title}
                </h2>
                <span className="text-center lg:text-left">
                  {page.twelve.description}
                </span>
              </div>

              <ButtonSecure text={page.twelve.cta} />
            </div>
          </section>

          <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
            <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
              Perguntas frequentes
            </h2>

            <Accordion items={page.thirteen.faq.items} />
          </section>
        </>
      )}
    </main>
  );
}
