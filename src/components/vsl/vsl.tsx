"use client";

import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

import type { VSLProps } from "./types";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VSL({
  videoId,
  onUnlock,
  className,
  children,
}: Omit<VSLProps, "unlockAt"> & { children?: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [ready, setReady] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const script = document.createElement("script");

      script.src = "https://www.youtube.com/iframe_api";

      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = initPlayer;
    };

    const initPlayer = () => {
      if (!containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          rel: 0,
          controls: 0,
          autoplay: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            setUnlocked(true);
            onUnlock?.();
          },
        },
      });
    };

    loadAPI();
  }, [videoId, onUnlock]);

  return (
    <section
      className={twMerge(
        "flex w-full flex-col items-center gap-8 pb-16",
        unlocked && "gap-0 pb-8",
        className
      )}
    >
      <div
        className="relative w-full max-w-308 sm:overflow-hidden sm:rounded-xl sm:px-8"
        style={{ aspectRatio: "16/9" }}
      >
        {!ready && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-neutral-900" />
        )}

        <div ref={containerRef} className="h-full w-full" />
      </div>

      {unlocked && (
        <div className="pointer-events-auto flex w-full translate-y-0 flex-col items-center opacity-100 transition-all duration-700">
          {children}
        </div>
      )}
    </section>
  );
}
