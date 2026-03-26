"use client";

import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

import { trackEvent } from "@/utils/track-event";

import type { VSLProps } from "./types";

const PLAYER_BASE = "https://player-vz-44088a1e-878.tv.pandavideo.com.br";

export function VSL({ videoId, className }: VSLProps) {
  const progressReached = useRef(new Set<number>());
  const loadedAt = useRef<number>(Date.now());
  const firstPlayed = useRef(false);
  const durationRef = useRef<number>(0);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("pandavideo.com.br")) return;

      const { event, currentTime, duration } = e.data ?? {};

      if (duration) durationRef.current = duration;

      if (event === "panda_play") {
        if (!firstPlayed.current) {
          firstPlayed.current = true;
          const secondsToPlay = Math.floor(
            (Date.now() - loadedAt.current) / 1000
          );

          trackEvent("vsl_first_play", { seconds_to_play: secondsToPlay });
        }
      }

      if (event === "panda_pause") {
        trackEvent("vsl_pause", { second: Math.floor(currentTime ?? 0) });
      }

      if (event === "panda_timeupdate") {
        const dur = durationRef.current;
        if (!dur || !currentTime) return;

        const percent = Math.floor((currentTime / dur) * 100);
        const checkpoints = [25, 50, 75, 100];

        checkpoints.forEach((point) => {
          if (percent >= point && !progressReached.current.has(point)) {
            progressReached.current.add(point);

            trackEvent("vsl_progress", {
              percent: point,
              second: Math.floor(currentTime),
            });

            if (point === 100) trackEvent("vsl_completed");
          }
        });
      }

      if (event === "panda_ended") {
        trackEvent("vsl_completed");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [videoId]);

  return (
    <section className={twMerge("w-full pb-8", className)}>
      <div
        className="relative mx-auto w-full max-w-308 overflow-hidden sm:rounded-xl sm:px-8"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          id={`panda-${videoId}`}
          src={`${PLAYER_BASE}/embed/?v=${videoId}&autoplay=1&muted=1&controls=0`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
