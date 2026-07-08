import { twMerge } from "tailwind-merge";

import Image from "next/image";

import { trackEvent } from "@/utils/track-event";

import { ButtonSecure } from "../button-secure/button-secure";

export function Hero() {
  const ctaPathname = "https://pay.hotmart.com/N105087897E?checkoutMode=10";

  return (
    <section className="relative mt-29 flex w-full items-stretch justify-center">
      <div className="relative flex h-fit w-full max-w-300 items-center justify-between">
        <div className="mt-8 flex h-fit flex-col items-center justify-center gap-4 px-8 md:py-24 lg:w-1/2 xl:px-0">
          <p className="text-center">
            Para empresários e gestores que faturam, mas não enxergam o
            resultado real do próprio negócio
          </p>

          <h1
            dangerouslySetInnerHTML={{
              __html:
                "Saia do caos financeiro da sua empresa e assuma o lugar de gestor do seu negócio lucrativo",
            }}
            className={twMerge(
              "text-center text-3xl font-medium xs:text-4xl",
              "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
              "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
            )}
          />

          <h2 className="text-center">
            Em poucas horas, você terá em mãos um método prático de gestão e
            três ferramentas profissionais de tomada de decisão para sair do
            endividamento, recuperar a margem e transformar faturamento em lucro
            real.
          </h2>

          <section className="flex w-full max-w-240 flex-col items-center gap-6">
            <div className="flex items-center gap-2.5 rounded-3xl border border-[#FF4848] px-8 py-3">
              <div className="size-2.5 animate-pulse rounded-full bg-[#FF4848]" />
              <span className="text-sm font-semibold text-[#FF4848] uppercase">
                Inscrições abertas — Oferta limitada
              </span>
            </div>

            <h2 className="text-center text-2xl font-semibold">
              Acesso imediato | Didática simples | Aplicação prática no seu
              negócio
            </h2>

            <ButtonSecure
              text="Quero destravar o meu lucro"
              pathname={ctaPathname}
              onClick={() =>
                trackEvent("click_cta", {
                  button_name: "Quero destravar o meu lucro",
                  location: "cta_primeira_chamada",
                })
              }
            />
          </section>
        </div>

        <Image
          src="/assets/photo1.webp"
          alt="Imagem"
          width={648}
          height={810}
          priority
          className="pointer-events-none -z-20 hidden w-1/2 shrink-0 object-contain select-none lg:block"
        />
      </div>

      <div className="absolute bottom-0 -z-10 h-10 w-full bg-linear-to-t from-[#100E10] from-55% to-[#100E10]/0 lg:h-14" />
    </section>
  );
}
