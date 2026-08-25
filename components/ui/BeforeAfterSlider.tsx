"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt, beforeLabel, afterLabel }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  function updatePosition(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }

  function handlePointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }

  function handlePointerUp() {
    isDragging.current = false;
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-col-resize rounded-[10px] overflow-hidden border border-border shadow-[var(--shadow-card)]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {/* After image — full, sits behind */}
      <Image src={afterSrc} alt={afterAlt} width={800} height={600} className="w-full h-auto block" draggable={false} priority />

      {/* Before image — same size, clipped by position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image src={beforeSrc} alt={beforeAlt} width={800} height={600} className="w-full h-auto block" draggable={false} priority />
      </div>

      {/* Slider handle */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${position}%` }}>
        <div className="absolute top-0 bottom-0 w-[2px] bg-white -translate-x-1/2 shadow-[0_0_4px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 3L2 8L5 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 3L14 8L11 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-[10px] left-[10px] bg-black/60 text-white text-[11px] font-medium px-[8px] py-[3px] rounded-[4px] pointer-events-none backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-[10px] right-[10px] bg-accent/85 text-white text-[11px] font-medium px-[8px] py-[3px] rounded-[4px] pointer-events-none backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
