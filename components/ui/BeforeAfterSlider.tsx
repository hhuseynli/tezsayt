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
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
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
      style={{ touchAction: "none" }}
    >
      {/* After image (full, behind) */}
      <Image src={afterSrc} alt={afterAlt} width={800} height={700} className="w-full h-auto block" draggable={false} priority />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={beforeSrc} alt={beforeAlt} width={800} height={700} className="w-full h-auto block" style={{ width: containerRef.current?.offsetWidth || "100%" }} draggable={false} priority />
      </div>

      {/* Slider line */}
      <div className="absolute top-0 bottom-0" style={{ left: `${position}%` }}>
        <div className="absolute top-0 bottom-0 w-[2px] bg-accent -translate-x-1/2" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-accent text-white flex items-center justify-center shadow-[var(--shadow-lift)] text-[14px]">
          ⟨⟩
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-[12px] left-[12px] bg-ink/70 text-white text-[11px] font-medium px-[8px] py-[3px] rounded-[4px] pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-[12px] right-[12px] bg-accent/90 text-white text-[11px] font-medium px-[8px] py-[3px] rounded-[4px] pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
}
