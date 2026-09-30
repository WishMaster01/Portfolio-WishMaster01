"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AuroraBackgroundProps = {
  intensity?: "low" | "medium" | "high";
  className?: string;
  children?: React.ReactNode;
};

export function AuroraBackground({
  intensity = "medium",
  className = "",
  children,
}: AuroraBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only track cursor on desktop pointer devices
    if (shouldReduceMotion || window.innerWidth < 1024) return;

    function handleMouseMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only update if pointer is roughly near/within the viewport
      if (e.clientY >= 0 && e.clientY <= window.innerHeight) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  const opacityMap = {
    low: "opacity-40",
    medium: "opacity-65",
    high: "opacity-85",
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Aurora Ambient Canvas Layer */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${opacityMap[intensity]}`}
        aria-hidden="true"
      >
        {/* Subtle Geometric Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

        {/* Primary Aurora Blob 1 (Cyan / Electric Violet) */}
        <div
          className={`absolute -top-36 left-1/4 h-[32rem] w-[42rem] rounded-full bg-gradient-to-tr from-[var(--ambient-one)] via-[var(--accent)] to-[var(--ambient-two)] blur-[110px] ${
            shouldReduceMotion ? "opacity-50" : "aurora-blob-1 opacity-60"
          }`}
        />

        {/* Secondary Aurora Blob 2 (Magenta / Teal / Indigo) */}
        <div
          className={`absolute top-1/3 -right-32 h-[34rem] w-[38rem] rounded-full bg-gradient-to-bl from-[var(--ambient-two)] via-[var(--ambient-three)] to-[var(--ambient-one)] blur-[125px] ${
            shouldReduceMotion ? "opacity-45" : "aurora-blob-2 opacity-50"
          }`}
        />

        {/* Tertiary Aurora Ribbon (Lower Ambient Depth) */}
        <div
          className={`absolute -bottom-40 left-10 h-[30rem] w-[46rem] rounded-full bg-gradient-to-r from-[var(--ambient-three)] via-[var(--ambient-one)] to-[var(--accent)] blur-[120px] ${
            shouldReduceMotion ? "opacity-40" : "aurora-pulse opacity-45"
          }`}
        />

        {/* Ambient Twinkling Floating Particles */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="absolute top-[12%] left-[18%] h-1.5 w-1.5 rounded-full bg-accent/80 particle-twinkle shadow-sm shadow-accent" style={{ animationDelay: "0s" }} />
            <span className="absolute top-[28%] right-[22%] h-1 w-1 rounded-full bg-purple-400/70 particle-twinkle shadow-sm shadow-purple-400" style={{ animationDelay: "1.2s" }} />
            <span className="absolute top-[45%] left-[8%] h-2 w-2 rounded-full bg-teal-400/60 particle-twinkle shadow-sm shadow-teal-400" style={{ animationDelay: "2.4s" }} />
            <span className="absolute top-[65%] right-[14%] h-1.5 w-1.5 rounded-full bg-accent/70 particle-twinkle shadow-sm shadow-accent" style={{ animationDelay: "0.8s" }} />
            <span className="absolute top-[82%] left-[30%] h-1 w-1 rounded-full bg-pink-400/60 particle-twinkle shadow-sm shadow-pink-400" style={{ animationDelay: "1.8s" }} />
            <span className="absolute top-[38%] left-[75%] h-1.5 w-1.5 rounded-full bg-cyan-300/80 particle-twinkle shadow-sm shadow-cyan-300" style={{ animationDelay: "3s" }} />
          </div>
        )}

        {/* Cursor-reactive spotlight (Desktop pointer only) */}
        {mousePos && !shouldReduceMotion ? (
          <div
            className="pointer-events-none absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_22%,transparent)_0%,transparent_70%)] blur-2xl transition-opacity duration-300"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
            }}
          />
        ) : null}
      </div>

      {children}
    </div>
  );
}
