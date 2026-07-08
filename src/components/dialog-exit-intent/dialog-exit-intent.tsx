"use client";

import { useEffect, useRef, useState } from "react";

import { XIcon } from "@phosphor-icons/react/dist/ssr";
import * as Dialog from "@radix-ui/react-dialog";

import { ButtonSecure } from "@/components/button-secure/button-secure";
import { trackEvent } from "@/utils/track-event";

import { DialogExitIntentProps } from "./types";
// import { CountdownTimer } from "../countdown-timer/countdown-timer";

export function DialogExitIntent({ ctaPathname }: DialogExitIntentProps) {
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null && !triggered.current) {
        triggered.current = true;
        setOpen(true);
      }
    };

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () =>
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (value) trackEvent("exit_intent_open", { location: "exit_intent" });
        if (!value)
          trackEvent("exit_intent_close", { location: "close_modal" });
        setOpen(value);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-800 bg-[#100E10] p-8 shadow-2xl shadow-black/60 focus:outline-none">
          <Dialog.Close asChild>
            <button
              aria-label="Fechar"
              className="absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-neutral-500 hover:text-neutral-200 focus-visible:border-[#67A4EE] focus-visible:text-neutral-200 focus-visible:ring-2 focus-visible:ring-[#67A4EE]/50 focus-visible:outline-none"
            >
              <XIcon size={16} weight="bold" aria-hidden />
            </button>
          </Dialog.Close>

          <div className="mt-6 mb-6 flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-[#67A4EE] uppercase">
              Ei, espera! Antes de ir...
            </span>

            <div className="flex items-end justify-between gap-8">
              <Dialog.Title className="text-2xl leading-snug font-bold">
                Oferta exclusiva{" "}
                <span className="bg-linear-to-r from-[#67A4EE] to-[#9EC042] bg-clip-text text-transparent">
                  só pra você agora
                </span>
              </Dialog.Title>

              {/* <CountdownTimer duration={1052} /> */}
            </div>
          </div>

          <div className="mb-6 flex items-stretch gap-6 rounded-xl border border-blue-400/20 bg-blue-400/5 p-5">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-[#67A4EE] uppercase">
                Por tempo limitado
              </span>
              <span className="text-neutral-200">Garanta agora com</span>
              <div className="flex items-baseline gap-2">
                <span className="bg-linear-to-r from-[#67A4EE] to-[#9EC042] bg-clip-text text-5xl leading-none font-extrabold text-transparent">
                  50%
                </span>
                <span className="text-xl font-bold text-neutral-50 uppercase">
                  Off
                </span>
              </div>
            </div>

            <div className="w-px self-stretch bg-neutral-700/60" />

            <div className="flex flex-1 flex-col justify-center gap-0.5">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Bônus incluso
              </span>
              <span className="text-sm font-medium text-neutral-200">
                Ebook <strong>Impostos para Empresários</strong> — do zero ao
                essencial
              </span>
            </div>
          </div>

          <ButtonSecure
            text="Quero garantir minha vaga agora"
            pathname={ctaPathname}
            onClick={() =>
              trackEvent("click_cta", {
                button_name: "Quero garantir minha vaga agora",
                location: "cta_modal",
              })
            }
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
