"use client";

import { useEffect, useRef, useState } from "react";

import { twMerge } from "tailwind-merge";

import { trackEvent } from "@/utils/track-event";

import type { VSLProps } from "./types";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VSL({ videoId, className }: VSLProps) {
  const [ready, setReady] = useState(false);

  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressReached = useRef(new Set<number>());
  const loadedAt = useRef<number>(Date.now());
  const firstPlayed = useRef(false);

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

    const startProgressTracking = () => {
      if (progressRef.current) clearInterval(progressRef.current);

      progressRef.current = setInterval(() => {
        const player = playerRef.current;
        if (!player) return;

        const current = player.getCurrentTime();
        const duration = player.getDuration();
        if (!duration) return;

        const percent = Math.floor((current / duration) * 100);
        const checkpoints = [25, 50, 75, 100];

        checkpoints.forEach((point) => {
          if (percent >= point && !progressReached.current.has(point)) {
            progressReached.current.add(point);
            trackEvent("vsl_progress", {
              percent: point,
              second: Math.floor(current),
            });

            if (point === 100) {
              trackEvent("vsl_completed");
              if (progressRef.current) clearInterval(progressRef.current);
            }
          }
        });
      }, 1000);
    };

    const stopProgressTracking = () => {
      if (progressRef.current) {
        clearInterval(progressRef.current);
        progressRef.current = null;
      }
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
            trackEvent("vsl_ready", { video_id: videoId });
          },
          onStateChange: (event) => {
            const current = Math.floor(
              playerRef.current?.getCurrentTime() ?? 0
            );

            if (event.data === window.YT.PlayerState.PLAYING) {
              if (!firstPlayed.current) {
                firstPlayed.current = true;
                const secondsToPlay = Math.floor(
                  (Date.now() - loadedAt.current) / 1000
                );
                trackEvent("vsl_first_play", {
                  seconds_to_play: secondsToPlay,
                });
              }
              startProgressTracking();
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              stopProgressTracking();
              trackEvent("vsl_pause", { second: current });
            }

            if (event.data === window.YT.PlayerState.BUFFERING) {
              stopProgressTracking();
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              stopProgressTracking();
            }
          },
        },
      });
    };

    loadAPI();

    return () => stopProgressTracking();
  }, [videoId]);

  return (
    <section className={twMerge("w-full pb-8", className)}>
      <div
        className="relative mx-auto w-full max-w-308 sm:overflow-hidden sm:rounded-xl sm:px-8"
        style={{ aspectRatio: "16/9" }}
      >
        {!ready && (
          <div className="absolute inset-0 animate-pulse rounded-xl bg-neutral-900" />
        )}
        <div ref={containerRef} className="h-full w-full" />
      </div>
    </section>
  );
}
