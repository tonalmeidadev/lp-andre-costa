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
  unlockAt,
  onUnlock,
  className,
  children,
}: VSLProps & { children?: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
          autoplay: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              intervalRef.current = setInterval(() => {
                const current = playerRef.current?.getCurrentTime() ?? 0;

                if (current >= unlockAt) {
                  setUnlocked(true);
                  onUnlock?.();

                  if (intervalRef.current) clearInterval(intervalRef.current);
                }
              }, 1000);
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
            }
          },
        },
      });
    };

    loadAPI();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoId, unlockAt, onUnlock]);

  return (
    <section
      className={twMerge(
        "flex w-full flex-col items-center gap-8 pb-16",
        unlocked && "gap-0 pb-8",
        className
      )}
    >
      <div
        className="w-full max-w-308 overflow-hidden rounded-xl sm:px-8"
        style={{ aspectRatio: "16/9" }}
      >
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {unlocked && (
        <div
          className={twMerge(
            "flex w-full flex-col items-center transition-all duration-700",
            unlocked
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
