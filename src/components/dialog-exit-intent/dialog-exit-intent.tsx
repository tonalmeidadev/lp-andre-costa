"use client";

import { useEffect, useRef, useState } from "react";

import { XIcon } from "@phosphor-icons/react/dist/ssr";
import * as Dialog from "@radix-ui/react-dialog";

import { ButtonSecure } from "@/components/button-secure/button-secure";
import { trackEvent } from "@/utils/track-event";

import { DialogExitIntentProps } from "./types";
import { CountdownTimer } from "../countdown-timer/countdown-timer";

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
            <button className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-neutral-500 transition-colors hover:text-neutral-200">
              <XIcon size={18} weight="bold" />
            </button>
          </Dialog.Close>

          <div className="mt-6 mb-6 flex flex-col gap-2">
            <span className="text-xs font-bold tracking-widest text-[#67A4EE] uppercase">
              Ei, espera! Antes de ir...
            </span>

            <div className="flex items-center justify-between gap-8">
              <Dialog.Title className="text-2xl leading-snug font-bold">
                Oferta exclusiva{" "}
                <span className="bg-linear-to-r from-[#67A4EE] to-[#9EC042] bg-clip-text text-transparent">
                  só pra você agora
                </span>
              </Dialog.Title>

              <CountdownTimer duration={1052} />
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-blue-400/20 bg-blue-400/5 p-5">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">Reset Empreendedor</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500 line-through">
                  R$ 397
                </span>
                <span className="text-2xl font-bold text-neutral-50">
                  R$ 129,90
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3">
              <span className="text-lg leading-4">🎁</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                  Bônus incluso
                </span>
                <span className="text-sm font-medium text-neutral-200">
                  Ebook <strong>Impostos para Empresários</strong> — do zero ao
                  essencial
                </span>
              </div>
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
