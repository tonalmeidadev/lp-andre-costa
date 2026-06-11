"use client";

import { useEffect, useState } from "react";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { twMerge } from "tailwind-merge";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { Accordion } from "@/components/accordion/accordion";
import { BulletPoints } from "@/components/bullet-points/bullet-points";
import { ButtonSecure } from "@/components/button-secure/button-secure";
import { DialogExitIntent } from "@/components/dialog-exit-intent/dialog-exit-intent";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/marquee/marquee";
import { SurvivalChart } from "@/components/survival-chart/survival-chart";
import { trackEvent } from "@/utils/track-event";

const TestimonialCarousel = dynamic(() =>
  import("@/components/testimonial/testimonial").then((m) => ({
    default: m.TestimonialCarousel,
  }))
);

export default function HomePage() {
  const [compact, setCompact] = useState(false);

  const ctaPathname = "https://pay.hotmart.com/N105087897E?checkoutMode=10";

  useEffect(() => {
    let rafId: ReturnType<typeof requestAnimationFrame>;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setCompact(window.scrollY > 20));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
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

    let maxScroll = document.body.scrollHeight - window.innerHeight;

    const onResize = () => {
      maxScroll = document.body.scrollHeight - window.innerHeight;
    };

    const handleScroll = () => {
      if (!maxScroll) return;
      const scrolled = (window.scrollY / maxScroll) * 100;

      checkpoints.forEach((point) => {
        if (scrolled >= point && !reached.has(point)) {
          reached.add(point);
          trackEvent("scroll_depth", { depth: point, location: `${point}%` });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const start = Date.now();
    const checkpoints = [30, 60, 120, 300];
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
              <Link
                href={ctaPathname}
                className="flex items-center gap-1 text-[#67A4EE] underline"
                onClick={() =>
                  trackEvent("click_cta", {
                    button_name: "Inscreva-se agora",
                    location: "cta_fixo",
                  })
                }
              >
                <span className="font-semibold">Inscreva-se agora</span>
                <ArrowUpRightIcon weight="bold" />
              </Link>
            </div>

            <span className="flex items-center gap-1 text-sm font-semibold">
              <span className="hidden sm:block">
                *O valor atual pode ser atualizado a qualquer momento
              </span>
              <span className="sm:hidden">
                *O valor atual pode sair do ar em{" "}
              </span>

              {/* <CountdownTimer
                variant="text"
                duration={1052}
                className="sm:hidden"
              /> */}

              <span className="sm:hidden">minutos</span>
            </span>
          </div>

          {/* <CountdownTimer duration={1052} className="hidden! sm:flex!" /> */}
        </div>
      </header>

      <section
        className={twMerge(
          "mt-32 flex w-full max-w-240 flex-col items-center gap-4 px-8 pt-4 pb-8"
        )}
      >
        <p className="text-center">
          Para empresários e gestores que faturam, mas não enxergam o resultado
          real do próprio negócio
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
          Em poucas horas, você terá em mãos um método prático de gestão e três
          ferramentas profissionais de tomada de decisão para sair do
          endividamento, recuperar a margem e transformar faturamento em lucro
          real.
        </h2>
      </section>

      {/* <VSL videoId="8ee219ff-ad73-41f7-97e0-3edecc89a66b" /> */}

      <section className="flex w-full max-w-240 flex-col items-center gap-6 px-8 pb-8">
        <div className="flex items-center gap-2.5 rounded-3xl border border-[#FF4848] px-8 py-3">
          <div className="size-2.5 animate-pulse rounded-full bg-[#FF4848]" />
          <span className="text-sm font-semibold text-[#FF4848] uppercase">
            Inscrições abertas — Oferta limitada
          </span>
        </div>

        <h2 className="text-center text-2xl font-semibold">
          Acesso imediato | Didática simples | Aplicação prática no seu negócio
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

      <Hero
      // headline={...}
      // description={...}
      />

      <section
        className={twMerge(
          "mt-24 flex w-full max-w-240 flex-col items-center gap-4 px-8 pt-4 pb-8"
        )}
      >
        <h2
          dangerouslySetInnerHTML={{
            __html:
              "Se você passa por alguma dessas situações, atenção, pois são sinais claros de problemas na gestão que podem levar a falência.",
          }}
          className={twMerge(
            "text-center text-3xl font-medium xs:text-4xl",
            "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
            "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
          )}
        />

        <p className="text-center">
          Antes de virarem crise, eles aparecem como pequenos sintomas no dia a
          dia. Se três ou mais dos pontos abaixo descrevem sua realidade, sua
          empresa opera em risco:
        </p>
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <BulletPoints
          itemsPerColumn={4}
          variant="check"
          items={[
            "O fechamento do mês raramente coincide com a expectativa de caixa",
            "Aumentos no faturamento não se traduzem em aumento proporcional de lucro",
            "A formação de preço é feita por comparação com o concorrente, não por estrutura de custo",
            "O contador entrega relatórios mensais que você arquiva sem leitura crítica",
            "A empresa recorre a crédito de curto prazo para honrar compromissos previsíveis",
            "O estoque cresce, o capital de giro diminui e a relação entre os dois nunca foi calculada",
            "Decisões estratégicas (contratação, expansão, corte) são tomadas com base em sensação, não em indicadores",
          ]}
          className="mb-12"
        />

        <p className="mb-12 text-center">
          Nenhum desses sintomas resolve com mais vendas. Todos se resolvem com
          leitura correta de número e isso se aprende com um método.
        </p>

        <ButtonSecure
          text="Quero encerrar o ciclo do achismo"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Quero encerrar o ciclo do achismo",
              location: "cta_abaixo_hero",
            })
          }
        />
      </section>

      <Marquee text="Reset Empreendedor" />

      <section
        className={twMerge(
          "mt-24 flex w-full max-w-240 flex-col items-center gap-4 px-8 pt-4 pb-8"
        )}
      >
        <h2
          dangerouslySetInnerHTML={{
            __html: "Empresas morrem por falta de gestão",
          }}
          className={twMerge(
            "text-center text-3xl font-medium xs:text-4xl",
            "[&>strong]:bg-linear-to-r [&>strong]:from-[#67A4EE] [&>strong]:to-[#9EC042]",
            "[&>strong]:bg-clip-text [&>strong]:font-medium [&>strong]:text-transparent"
          )}
        />

        <div
          className="mt-6 text-center [&>span]:font-semibold"
          dangerouslySetInnerHTML={{
            __html:
              "A maioria dos negócios brasileiros que fecham as portas no primeiro quinquênio tinha clientes, tinha produto e tinha faturamento. O que faltou foi um sistema de leitura do próprio resultado  algo que separasse movimento de lucro, custo fixo de variável, capital de giro de capital ocioso. Esse sistema não exige formação em contabilidade, software caro ou consultoria mensal. Exige método que todas as empresas podem aplicar imediatamente e começar a colher os resultados<br/><br/><span>E é exatamente isso que o Reset Empreendedor instala no seu negócio em uma única tarde de estudo aplicado.</span>.",
          }}
        />

        <SurvivalChart />
      </section>

      <section className="flex w-full max-w-240 flex-col items-center gap-6 px-8 pb-8">
        <div className="flex items-center gap-2.5 rounded-3xl border border-[#FF4848] px-8 py-3">
          <div className="size-2.5 animate-pulse rounded-full bg-[#FF4848]" />
          <span className="text-sm font-semibold text-[#FF4848] uppercase">
            Inscrições abertas — Oferta limitada
          </span>
        </div>

        <h2 className="text-center text-2xl font-semibold">
          Acesso imediato | Didática simples | Aplicação prática no seu negócio
        </h2>

        <ButtonSecure
          text="Quero destravar o meu lucro"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Quero destravar o meu lucro",
              location: "cta_abaixo_grafico",
            })
          }
        />
      </section>

      <section className="mt-24 flex w-full max-w-240 flex-col items-center gap-10 px-8 py-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-medium -tracking-wide xs:text-4xl">
            Três pilares. Três níveis de decisão.
          </h2>
          <p className="max-w-2xl">
            O Método Reset Empreendedor se sustenta em três pilares e cada um
            resolve um nível diferente de decisão.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Pilar 01
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">Clareza</h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Você passa a enxergar com precisão o que entra, o que sai e o que
              de fato sobra. Acaba a confusão entre faturamento, receita e
              lucro. As decisões deixam de partir da sensação e passam a partir
              do dado.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Pilar 02
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">Estrutura</h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Você aprende a precificar com base em custo real, dimensionar
              capital de giro adequado, gerir estoque sem travar caixa e
              calcular o impacto tributário sobre a margem. A empresa deixa de
              operar no improviso e passa a operar em sistema.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Pilar 03
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">Decisão</h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Você implementa o ritual semanal dos sete indicadores que todo
              gestor precisa acompanhar. Em cinco minutos por semana, você sabe
              se a empresa caminha para o azul ou para o vermelho — e age antes
              do problema chegar ao caixa.
            </p>
          </div>
        </div>
      </section>

      <section className="flex h-fit w-full flex-col items-center py-8 md:py-16">
        <div className="flex w-full max-w-240 flex-col px-8">
          <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
            O que é o Reset Empreendedor
          </h2>

          <div
            className="mb-6 text-center [&>span]:font-semibold"
            dangerouslySetInnerHTML={{
              __html:
                "Um treinamento condensado de gestão financeira aplicada, estruturado em 22 aulas objetivas, distribuídas em 5 módulos progressivos, com 3 horas de duração total.<br/><br/>Cada aula é construída sobre o princípio da aplicação imediata: você assiste com a ferramenta aberta e termina a sessão com uma decisão tomada ou uma estrutura implementada no próprio negócio.<br/><br/>Você conclui o treinamento dominando:",
            }}
          />

          <BulletPoints
            itemsPerColumn={3}
            variant="check"
            items={[
              "Quanto sua empresa lucra de fato, descontados todos os custos e impostos",
              "Qual o preço mínimo viável de cada produto ou serviço para gerar margem real",
              "Quanto capital de giro sua operação exige para não recorrer a crédito emergencial",
              "Onde o dinheiro está sendo drenado de forma silenciosa (estoque, custo fixo, tributação)",
              "Quais sete indicadores financeiros monitorar semanalmente para decidir com segurança",
            ]}
            className="mb-12"
          />

          <p className="mb-12 text-center">
            E recebe, junto, três ferramentas profissionais prontas para uso no
            mesmo dia.
          </p>

          <ButtonSecure
            text="Quero acessar ao método"
            pathname={ctaPathname}
            onClick={() =>
              trackEvent("click_cta", {
                button_name: "Quero acessar ao método",
                location: "cta_abaixo_o_que_e",
              })
            }
          />
        </div>
      </section>

      <section className="flex h-fit w-full flex-col items-center py-8 md:py-16">
        <div className="flex w-full max-w-240 flex-col px-8">
          <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
            22 aulas. 5 módulos. Cada minuto desenhado para gerar uma decisão
            melhor.
          </h2>
        </div>

        <div className="relative mt-12 w-full max-w-240 px-8">
          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-neutral-700 md:block" />

          {(
            [
              {
                label: "Módulo 01",
                title: "Fundamentos da Mentalidade de Gestor",
                description:
                  "A diferença entre o empresário que opera o negócio e o empresário que dirige o negócio. Como reposicionar sua mentalidade para tomar decisões com a perspectiva correta — base de tudo que vem a seguir.",
                thumb: "/assets/thumbs/01.webp",
              },
              {
                label: "Módulo 02",
                title: "O Caminho do Dinheiro",
                description:
                  "Por que empresas que faturam bem ficam sem caixa. Como diferenciar faturamento, receita, margem bruta e lucro líquido. Como calcular, com precisão, quanto a empresa efetivamente gera para o sócio.",
                thumb: "/assets/thumbs/02.webp",
              },
              {
                label: "Módulo 03",
                title: "Custos, Preço e Capital de Giro",
                description:
                  "Separação técnica entre custos fixos e variáveis. Formação de preço com lógica matemática (não comparativa). Cálculo de capital de giro adequado ao porte e ciclo da operação. Gestão de estoque sem comprometer caixa.",
                thumb: "/assets/thumbs/03.webp",
              },
              {
                label: "Módulo 04",
                title: "Tributação Aplicada à Decisão",
                description:
                  "Como a carga tributária impacta diretamente a margem e a precificação. O que o gestor precisa entender de impostos para não tomar decisão errada — mesmo tendo um contador competente.",
                thumb: "/assets/thumbs/04.webp",
              },
              {
                label: "Módulo 05",
                title: "Indicadores e Caso Real",
                description:
                  "Os sete KPIs financeiros essenciais. Como montar o painel semanal de gestão. Aplicação prática em um caso real: como um negócio aplicou o método e modificou seus indicadores em 90 dias.",
                thumb: "/assets/thumbs/05.webp",
              },
            ] as const
          ).map((mod, i) => {
            const isEven = i % 2 === 0;

            const imagePanel = (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={mod.thumb}
                  alt={mod.title}
                  fill
                  className="object-cover"
                />
              </div>
            );

            const textPanel = (
              <div className="flex h-full flex-col justify-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase">
                  {mod.label}
                </span>
                <h3 className="text-2xl leading-snug font-bold">{mod.title}</h3>
                <p className="text-sm leading-relaxed">{mod.description}</p>
              </div>
            );

            return (
              <div
                key={i}
                className="flex flex-col gap-6 py-8 md:grid md:grid-cols-[1fr_56px_1fr] md:gap-0 md:py-14"
              >
                {/* Image — always first in DOM (top on mobile) */}
                <div
                  className={twMerge(
                    isEven ? "md:pr-10" : "md:order-3 md:pl-10"
                  )}
                >
                  {imagePanel}
                </div>

                {/* Circle connector — desktop only */}
                <div
                  className={twMerge(
                    "hidden items-center justify-center md:flex",
                    !isEven && "md:order-2"
                  )}
                >
                  <div className="z-10 size-5 rounded-full border border-white/30 bg-[#100E10]" />
                </div>

                {/* Text */}
                <div
                  className={twMerge(
                    isEven ? "md:pl-10" : "md:order-1 md:pr-10"
                  )}
                >
                  {textPanel}
                </div>
              </div>
            );
          })}
        </div>

        <ButtonSecure
          text="Quer percorrer os 5 módulos"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Quer percorrer os 5 módulos",
              location: "cta_abaixo_modulos",
            })
          }
        />
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
          Para quem é esse treinamento
        </h2>

        <p className="mb-6 text-center">Para quem é o Reset Empreendedor</p>

        <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <h3 className="text-xl font-semibold">É para você que...</h3>
            <BulletPoints
              itemsPerColumn={5}
              variant="check"
              items={[
                "Já empreende e sente desorganização financeira",
                "Vende, mas não consegue ler os números com clareza",
                "Quer aprender gestão de forma simples e prática",
                "Precisa melhorar margem, preço e controle",
                "Quer parar de administrar no improviso",
              ]}
              className="grid-cols-1!"
            />
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <h3 className="text-xl font-semibold">Não é pra você que...</h3>
            <BulletPoints
              itemsPerColumn={4}
              variant="x"
              items={[
                "Procura fórmula mágica",
                "Não quer olhar para números",
                "Não está disposto a aplicar o conteúdo no negócio",
                "Quer apenas motivação, mas não quer ferramentas para executar",
              ]}
              className="grid-cols-1!"
            />
          </div>
        </div>

        <ButtonSecure
          text="Quero mais dinheiro no caixa"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Quero mais dinheiro no caixa",
              location: "cta_acima_bio",
            })
          }
        />
      </section>

      <Marquee text="Reset Empreendedor" />

      <section className="relative flex h-fit w-full items-end justify-center overflow-hidden py-8 md:py-16">
        <Image
          src="/assets/background.webp"
          alt="Foto de André Costa"
          width={1920}
          height={925}
          className="pointer-events-none absolute -z-30 h-full w-full object-cover select-none"
        />

        <div className="absolute bottom-0 -z-10 h-1/2 w-full bg-linear-to-t from-[#100E10] to-[#100E10]/0" />
        <div className="absolute top-0 -z-10 h-1/2 w-full bg-linear-to-b from-[#100E10] to-[#100E10]/0" />

        <div className="flex w-full max-w-160 flex-col items-center gap-12 px-8 lg:max-w-300 lg:flex-row">
          <Image
            src="/assets/bio.webp"
            alt="Imagem"
            width={438}
            height={572}
            className="pointer-events-none size-80 shrink-0 rounded-full object-cover object-top-right select-none xs:size-100 lg:order-1 lg:size-[inherit] lg:h-142 lg:w-108 lg:rounded-lg"
          />

          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h2 className="w-fit bg-linear-to-r from-[#67A4EE] to-[#9EC042] bg-clip-text text-center text-3xl font-medium text-transparent xs:text-4xl lg:text-left">
              André Costa
            </h2>

            <div
              className="text-center lg:text-left [&_i]:text-neutral-300 [&_i>span]:not-italic [&>h2]:mb-3 [&>h2]:text-xl [&>h2]:font-semibold [&>ul]:flex [&>ul]:flex-col [&>ul]:gap-2 [&>ul>li>span]:text-green-300"
              dangerouslySetInnerHTML={{
                __html:
                  "<h2>quase duas décadas de gestão executiva aplicada Corpo:</h2><p>André Costa é cofundador e foi executivo responsável pela escalada de uma das maiores empresas do setor farmacêutico brasileiro. Sua atuação envolveu gestão de caixa em ambientes de alto giro, decisões de precificação em mercado regulado, estruturação de capital de giro e governança financeira em ciclos de crescimento e de contração.</p><br/><p><p>Formação executiva:</p><br/><ul><li><span>✔</span> Pós-graduação em Desenvolvimento Humano para Gestores (FGV)</li><li><span>✔</span> Global Business Management (IBMEC)</li><li><span>✔</span> Certificação em M&A — Columbia University, Nova York</li><li><span>✔</span> Quase 20 anos de experiência executiva no setor privado</li></ul><br/><p>O método ensinado no Reset Empreendedor não é teoria importada de manual de MBA. É a sistematização do que André aplica, há quase vinte anos, na gestão de operações milionárias onde cada decisão tem consequência mensurável.</p><br/><p><i>“Gestão financeira não é privilégio de empresa grande. É a única coisa que diferencia empresa que sobrevive de empresa que prospera.”<br/><span>— André Costa</span></i></p>",
              }}
            />
          </div>
        </div>
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
          Além do curso inteiro e completo para você colocar em prática
          rapidamente, você também recebe ferramentas fundamentais para o
          sucesso da sua empresa.
        </h2>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Ferramenta 01
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">
                Planilha Profissional de Fluxo de Caixa
              </h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Estrutura pronta para projeção de entradas, saídas e saldo dos
              próximos 90 dias. Permite identificar gargalos de caixa com
              antecedência mínima de três semanas — janela suficiente para agir
              antes do problema se materializar.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Ferramenta 02
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">
                Calculadora de Precificação
              </h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Sistema matemático que recebe custos diretos, custos indiretos,
              alíquota tributária e margem-alvo, e devolve o preço de venda
              tecnicamente correto. Elimina a precificação por comparação com
              concorrente fonte do erro mais comum em PMEs brasileiras.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <span className="text-xs font-bold tracking-widest uppercase">
              Ferramenta 03
            </span>
            <div>
              <h3 className="mb-3 text-2xl font-bold">
                Roteiro Semanal dos Sete Indicadores
              </h3>
              <div className="h-px bg-neutral-700" />
            </div>
            <p className="leading-relaxed">
              Documento operacional que lista, na ordem correta, os sete KPIs
              que devem ser revisados toda segunda-feira em sessão de até cinco
              minutos. Quem aplica o roteiro consistentemente passa a antecipar
              tendências em vez de reagir a fatos consumados.
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full max-w-300 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-12 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
          Veja o que Empresários que pararam de operar no improviso estão
          falando sobre o Resent Empreendedor
        </h2>

        <TestimonialCarousel
          items={[
            {
              rating: 5,
              title: "Encerrei o ciclo de surpresas no fim do mês.",
              text: "Eu acreditava que meu problema era volume de venda. Após o treinamento, identifiquei que o problema era a leitura do que eu já vendia. Hoje fecho cada mês com previsibilidade.",
              author: {
                name: "Ricardo A. — Empresário",
                locale: "Belo Horizonte",
              },
            },
            {
              rating: 5,
              title: "Refiz minha precificação na semana seguinte.",
              text: "A clareza com que o conteúdo é exposto permite aplicação imediata. No primeiro fim de semana após o treinamento, reconfigurei a tabela de preços do meu serviço. A margem corrigiu-se em duas semanas.",
              author: {
                name: "Mariana S. — Prestadora de Serviços",
                locale: "São Paulo",
              },
            },
            {
              rating: 5,
              title:
                "Decidir com dado em vez de sensação muda completamente a operação.",
              text: "Comecei a acompanhar fluxo de caixa, margem e precificação dentro de uma estrutura. A segurança para tomar decisão — sobretudo nas decisões de maior risco — aumentou significativamente.",
              author: {
                name: "Fernanda L. — Lojista",
                locale: "Curitiba",
              },
            },
            {
              rating: 5,
              title:
                "Conteúdo que deveria estar na formação de todo empresário.",
              text: "Direto, técnico e prático. Identifiquei equívocos de gestão que eu cometia há anos sem ter consciência. Recomendo para qualquer empreendedor que pretende ter controle real sobre seu negócio.",
              author: {
                name: "Carlos M. — Empresário",
                locale: "Rio de Janeiro",
              },
            },
          ]}
        />

        <ButtonSecure
          text="Quero uma empresa lucrativa"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Quero uma empresa lucrativa",
              location: "cta_ultimo_abaixo_bio",
            })
          }
        />
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8">
        <div className="mb-12 grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-neutral-700 sm:grid-cols-[auto_1fr]">
          {/* Left — price block */}
          <div className="flex flex-col items-center justify-center gap-3 bg-white/6 px-10 py-10 sm:border-r sm:border-white/10">
            <span className="text-xs font-semibold tracking-widest uppercase">
              por apenas
            </span>
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-semibold text-neutral-300">
                  12x de
                </span>
                <span className="text-6xl font-bold tracking-tight">
                  R$&nbsp;12,99
                </span>
              </div>
              <div className="mt-3 rounded-lg bg-neutral-700 px-4 py-2 text-center">
                <span className="text-xs tracking-widest uppercase">
                  ou à vista por
                </span>
                <p className="text-2xl font-bold">R$ 129,90</p>
              </div>
            </div>
            <span className="mt-1 text-xs line-through">de R$ 397,00</span>
          </div>

          {/* Right — details + CTA */}
          <div className="flex flex-col justify-center gap-6 px-8 py-10 text-center">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#67A4EE] uppercase">
                Reset Empreendedor — Acesso Completo
              </span>
              <p className="mt-2 text-lg leading-snug font-semibold">
                Hoje você terá acesso ao método com uma{" "}
                <strong>condição exclusiva.</strong>
              </p>
            </div>

            <ul className="flex flex-col items-center gap-2.5 text-sm text-neutral-300">
              {[
                "Treinamento completo (22 aulas / 5 módulos)",
                "Planilha de Fluxo de Caixa",
                "Calculadora de Precificação",
                "Roteiro Semanal dos 7 Indicadores",
                "Acesso imediato após confirmação do pagamento",
                "Liberação vitalícia, sem mensalidade",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="shrink-0 text-[#9EC042]">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <ButtonSecure
              text="Garantir meu acesso agora"
              pathname={ctaPathname}
              onClick={() =>
                trackEvent("click_cta", {
                  button_name: "Garantir meu acesso agora",
                  location: "cta_pricing_card",
                })
              }
            />

            <p className="text-xs">
              Pagamento processado pela Hotmart — ambiente 100% seguro
            </p>
          </div>
        </div>
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
          Vamos jogar limpo:
        </h2>

        <span
          className="mb-6 text-center [&>span]:font-semibold"
          dangerouslySetInnerHTML={{
            __html:
              "Você não é obrigado a fazer o Reset Empreendedor, mas isso também tem um custo.<br/><br/>E ele  reflete no caixa da sua empresa.<br/><br/>Considere o seguinte:",
          }}
        />

        <div className="mb-12 grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <p className="leading-relaxed">
              Uma precificação 5% abaixo do correto, em uma operação que fatura
              R$ 50 mil mensais, representa R$ 30 mil de margem perdida por ano.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <p className="leading-relaxed">
              Capital de giro mal dimensionado leva, em média, ao uso de crédito
              emergencial com custo entre 8% e 14% ao mês, um único episódio
              anual já supera o investimento neste treinamento em mais de dez
              vezes.
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-700 bg-white/4 p-7">
            <p className="leading-relaxed">
              Estoque parado representa, em média, 18% do capital de uma
              operação de varejo, capital que poderia estar em caixa, em
              investimento ou em expansão.
            </p>
          </div>
        </div>

        <span
          className="text-center [&>span]:font-semibold"
          dangerouslySetInnerHTML={{
            __html:
              "Esses números fazem parte da realidade da maior parte das pequenas e médias empresas brasileiras, incluindo, com alta probabilidade, a sua.<br/><br/>Três horas de estudo, aplicadas hoje, evitam três anos de prejuízo invisível.",
          }}
        />
      </section>

      <section className="flex w-full max-w-240 flex-col items-center px-8 py-8 md:py-16">
        <h2 className="mb-6 text-center text-3xl font-medium -tracking-wide xs:text-4xl">
          Tire suas dúvidas antes de decidir
        </h2>

        <Accordion
          items={[
            {
              question: "Funciona para quem está começando?",
              answer:
                "Sim — e é um dos melhores momentos para aprender isso. Quem começa sem essa base repete os erros mais comuns por anos antes de entender o que está errado.",
            },
            {
              question: "Preciso entender de contabilidade?",
              answer:
                "Não. O treinamento foi criado especificamente para empreendedores sem formação em finanças. A didática é simples e a aplicação é imediata.",
            },
            {
              question: "É só sobre finanças?",
              answer:
                "Finanças é o fio condutor, mas o treinamento cobre mentalidade de gestão, indicadores, estoque, precificação e tomada de decisão — tudo integrado.",
            },
            {
              question: "Em quanto tempo consigo aplicar?",
              answer:
                "A maioria dos alunos já aplica algo no primeiro dia. O conteúdo é estruturado para você assistir e agir — não para acumular no histórico sem usar.",
            },
            {
              question: "O acesso é imediato?",
              answer:
                "Sim. Assim que o pagamento é confirmado, você recebe acesso completo ao treinamento e todos os materiais incluídos.",
            },
          ]}
        />

        <ButtonSecure
          text="Sua mudança em um clique"
          pathname={ctaPathname}
          onClick={() =>
            trackEvent("click_cta", {
              button_name: "Sua mudança em um clique",
              location: "cta_abaixo_faq",
            })
          }
        />
      </section>

      <DialogExitIntent ctaPathname={ctaPathname} />
    </main>
  );
}
