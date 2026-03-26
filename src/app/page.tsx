"use client";

import { useEffect, useState } from "react";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";

import Image from "next/image";
import Link from "next/link";

import { Accordion } from "@/components/accordion/accordion";
import { Blocks } from "@/components/blocks/blocks";
import { BulletPoints } from "@/components/bullet-points/bullet-points";
import { ButtonSecure } from "@/components/button-secure/button-secure";
import { CountdownTimer } from "@/components/countdown-timer/countdown-timer";
import { DialogExitIntent } from "@/components/dialog-exit-intent/dialog-exit-intent";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/marquee/marquee";
import { SwiperCard } from "@/components/swiper-card/swiper-card";
import { TestimonialCarousel } from "@/components/testimonial/testimonial";
import { VSL } from "@/components/vsl/vsl";
import { page } from "@/constants/page";
import { trackEvent } from "@/utils/track-event";

export default function HomePage() {
  const [compact, setCompact] = useState(false);

  const ctaPathname = "https://pay.hotmart.com/N105087897E?checkoutMode=10";

  useEffect(() => {
    const handleScroll = () => setCompact(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const messages = [
      "Oferta exclusiva por tempo limitado…",
      "André Costa — Reset Empreendedor",
    ];

    let index = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const original = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        interval = setInterval(() => {
          document.title = messages[index % messages.length];
          index++;
        }, 2000);
      } else {
        if (interval) clearInterval(interval);
        document.title = original;
        index = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (interval) clearInterval(interval);

      document.title = original;
    };
  }, []);

  useEffect(() => {
    const checkpoints = [25, 50, 75, 100];
    const reached = new Set<number>();

    const handleScroll = () => {
      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;

      checkpoints.forEach((point) => {
        if (scrolled >= point && !reached.has(point)) {
          reached.add(point);
          trackEvent("scroll_depth", { depth: point, location: `${point}%` });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tempo na página
  useEffect(() => {
    const start = Date.now();
    const checkpoints = [30, 60, 120, 300]; // segundos
    const reached = new Set<number>();

    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - start) / 1000);

      checkpoints.forEach((point) => {
        if (seconds >= point && !reached.has(point)) {
          reached.add(point);
          trackEvent("time_on_page", { seconds: point });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clicks: { x: number; y: number; time: number }[] = [];

    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      clicks.push({ x: e.clientX, y: e.clientY, time: now });

      const recent = clicks.filter((c) => now - c.time < 2000);
      const nearby = recent.filter(
        (c) => Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30
      );

      if (nearby.length >= 3) {
        trackEvent("rage_click", {
          location: (e.target as HTMLElement)?.tagName?.toLowerCase(),
          x: Math.round(e.clientX),
          y: Math.round(e.clientY),
        });
        clicks.length = 0;
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const key = "page_visit_count";
    const count = parseInt(localStorage.getItem(key) ?? "0", 10) + 1;
    localStorage.setItem(key, String(count));

    if (count > 1) {
      trackEvent("page_return", { times_returned: count });
    }
  }, []);

  return (
    <main className="flex flex-col items-center">
      <header className="fixed top-0 right-0 left-0 z-50 flex w-dvw justify-center bg-[#100E10] shadow-2xl shadow-[#100E10]">
        <div
          className={twMerge(
            "flex w-full max-w-300 flex-col items-center justify-center gap-4 px-4 transition-all sm:flex-row",
            compact ? "py-4" : "py-8"
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-2.5 animate-pulse rounded-full bg-red-500" />

                <span
                  className="text-center font-semibold uppercase sm:text-start [&>span]:line-through"
                  dangerouslySetInnerHTML={{ __html: page.zero.description }}
                />
              </div>

              <span className="hidden sm:block">—</span>

              <Link
                href={ctaPathname}
                className="flex items-center gap-1 text-[#67A4EE] underline"
                onClick={() =>
                  trackEvent("click_cta", {
                    button_name: page.zero.cta,
                    location: "cta_fixo",
                  })
                }
              >
                <span className="font-semibold">{page.zero.cta}</span>
                <ArrowUpRightIcon weight="bold" />
              </Link>
            </div>

            <span className="flex items-center gap-1 text-sm font-semibold text-neutral-400">
              <span className="hidden sm:block">{page.zero.conditionText}</span>
              <span className="sm:hidden">{page.zero.conditionTextTimer} </span>

              <CountdownTimer
                variant="text"
                duration={1052}
                className="sm:hidden"
              />

              <span className="sm:hidden">minutos</span>
            </span>
          </div>

          <CountdownTimer duration={1052} className="hidden! sm:flex!" />
        </div>
      </header>

      <section
        className={twMerge(
          "mt-32 flex w-full max-w-240 flex-col items-center gap-4 px-8 pt-4 pb-8"
        )}
      >
        <h1
          dangerouslySetInnerHTML={{ __html: page.one.headline.html }}
          className={twMerge(
            "text-center text-4xl font-medium",
            "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
            "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
          )}
        />

        <span className="text-center">{page.one.description}</span>
      </section>

      <VSL videoId={page.two.vsl.videoId} />

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

        <ButtonSecure
          text={page.three.cta}
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: page.three.cta,
              location: "cta_abaixo_vsl",
            })
          }
        />
      </section>

      <Hero
        headline={page.four.headline.html}
        description={page.four.description}
      />

      <Marquee text={page.five.marqueeText} />

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
          {page.six.title}
        </h2>

        <span className="mb-6 text-center">{page.six.description}</span>

        <BulletPoints
          itemsPerColumn={page.six.bullets.itemsPerColumn}
          variant={page.six.bullets.variant}
          items={page.six.bullets.items}
          className="mb-12"
        />

        <ButtonSecure
          text={page.six.cta}
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: page.six.cta,
              location: "cta_abaixo_hero",
            })
          }
        />
      </section>

      <section className="flex h-fit w-full flex-col items-center py-8 md:py-16">
        <div className="flex w-full max-w-240 flex-col px-8">
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

        <div className="mt-12 flex h-fit w-full flex-col px-8">
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
              itemsPerColumn={item.blocks.itemsPerColumn}
              items={item.blocks.items}
              className="mb-12"
            />
          </div>
        ))}

        <div className="flex w-full max-w-240 flex-col">
          <div className="mb-6 flex items-center gap-4 rounded-[0.625rem] border border-amber-400/25 bg-amber-400/5 px-6 py-4 shadow-2xl shadow-amber-400/10">
            <span className="text-2xl">⚡</span>
            <span className="font-semibold text-amber-500">
              {page.eight.ctaCard}
            </span>
          </div>

          <ButtonSecure
            text={page.eight.cta}
            pathname={ctaPathname}
            onClick={() =>
              trackEvent("click_cta", {
                button_name: page.eight.cta,
                location: "cta_abaixo_banner_amarelo",
              })
            }
          />
        </div>
      </section>

      <section className="flex w-full max-w-300 flex-col items-center px-8 py-8 md:py-16">
        <div className="mb-12 grid w-full grid-cols-1 items-center gap-8 sm:grid-cols-2">
          <h2 className="text-center text-4xl font-medium -tracking-wide sm:max-w-100 sm:text-start">
            {page.nine.title}
          </h2>

          <span className="w-full text-center sm:max-w-80 sm:text-start">
            {page.nine.description}
          </span>
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

        <ButtonSecure
          text={page.ten.cta}
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: page.ten.cta,
              location: "cta_acima_bio",
            })
          }
        />
      </section>

      <Marquee text={page.five.marqueeText} />

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

          <ButtonSecure
            text={page.twelve.cta}
            pathname={ctaPathname}
            onClick={() =>
              trackEvent("click_cta", {
                button_name: page.twelve.cta,
                location: "cta_ultimo_abaixo_bio",
              })
            }
          />
        </div>
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-4xl font-medium -tracking-wide">
          Perguntas frequentes
        </h2>

        <Accordion items={page.thirteen.faq.items} />
      </section>

      <DialogExitIntent ctaPathname={ctaPathname} />
    </main>
  );
}
