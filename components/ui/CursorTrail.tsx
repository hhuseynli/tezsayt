"use client";

import { useEffect, useRef, useCallback } from "react";

const LINE_COUNT = 3;
const SPEED_THRESHOLD = 10;
const MAX_LEN = 50;
const SHRINK_RATE = 0.85;
const LERP_POS = 0.4;
const LERP_ANGLE = 0.2;
const LERP_LEN = 0.25;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpAngle(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return a + d * t;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursor = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const smoothAngle = useRef(0);
  const targetAngle = useRef(0);
  const lineLen = useRef(0);
  const targetLen = useRef(0);
  const opacity = useRef(0);
  const moving = useRef(false);
  const rafId = useRef(0);
  const initialized = useRef(false);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = window.innerWidth * window.devicePixelRatio;
    c.height = window.innerHeight * window.devicePixelRatio;
    c.style.width = `${window.innerWidth}px`;
    c.style.height = `${window.innerHeight}px`;
  }, []);

  const tick = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio;

    ctx.clearRect(0, 0, c.width, c.height);

    // Smooth towards cursor
    smoothPos.current.x = lerp(smoothPos.current.x, cursor.current.x, LERP_POS);
    smoothPos.current.y = lerp(smoothPos.current.y, cursor.current.y, LERP_POS);
    smoothAngle.current = lerpAngle(smoothAngle.current, targetAngle.current, LERP_ANGLE);

    // Grow or shrink length
    if (moving.current) {
      lineLen.current = lerp(lineLen.current, targetLen.current, LERP_LEN);
      opacity.current = Math.min(1, opacity.current + 0.12);
    } else {
      lineLen.current *= SHRINK_RATE;
      opacity.current *= SHRINK_RATE;
    }

    if (opacity.current < 0.01 && lineLen.current < 0.5) {
      opacity.current = 0;
      lineLen.current = 0;
      return;
    }

    const angle = smoothAngle.current;
    const cx = smoothPos.current.x * dpr;
    const cy = smoothPos.current.y * dpr;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const perpCos = Math.cos(angle + Math.PI / 2);
    const perpSin = Math.sin(angle + Math.PI / 2);

    // Draw 3 lines behind the cursor, pointing backward
    for (let i = 0; i < LINE_COUNT; i++) {
      const spacing = 5 * dpr;
      const perpOff = (i - 1) * spacing;
      const len = lineLen.current * (1 - i * 0.18) * dpr;
      const lineOpacity = opacity.current * (0.4 - i * 0.1);

      if (len < 1 || lineOpacity < 0.005) continue;

      // Line starts behind cursor, extends further back
      const gap = 10 * dpr;
      const startX = cx - cos * gap + perpCos * perpOff;
      const startY = cy - sin * gap + perpSin * perpOff;
      const endX = startX - cos * len;
      const endY = startY - sin * len;

      // Tapered line: thick at start, thin at end
      const startW = (2.5 - i * 0.3) * dpr;
      const steps = 6;

      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = lerp(startX, endX, t);
        const y = lerp(startY, endY, t);
        const w = lerp(startW, 0.3 * dpr, t * t); // quadratic taper

        if (s === 0) {
          ctx.moveTo(x + perpCos * w, y + perpSin * w);
        } else {
          ctx.lineTo(x + perpCos * w, y + perpSin * w);
        }
      }
      for (let s = steps; s >= 0; s--) {
        const t = s / steps;
        const x = lerp(startX, endX, t);
        const y = lerp(startY, endY, t);
        const w = lerp(startW, 0.3 * dpr, t * t);
        ctx.lineTo(x - perpCos * w, y - perpSin * w);
      }
      ctx.closePath();

      ctx.fillStyle = `rgba(168, 71, 31, ${lineOpacity})`;
      ctx.fill();
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let stopTimer: ReturnType<typeof setTimeout>;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - cursor.current.x;
      const dy = e.clientY - cursor.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (!initialized.current) {
        smoothPos.current = { x: e.clientX, y: e.clientY };
        initialized.current = true;
      }

      cursor.current = { x: e.clientX, y: e.clientY };

      if (speed > SPEED_THRESHOLD) {
        moving.current = true;
        targetAngle.current = Math.atan2(dy, dx);
        targetLen.current = Math.min(MAX_LEN, speed * 2);
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => { moving.current = false; }, 40);

        if (opacity.current < 0.01) {
          rafId.current = requestAnimationFrame(tick);
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId.current);
      clearTimeout(stopTimer);
    };
  }, [tick, resize]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden
    />
  );
}
