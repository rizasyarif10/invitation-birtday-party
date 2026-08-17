"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#FF7518", "#FFAD42", "#E76F19", "#A94410", "#F6D39D"];
const PARTICLE_COUNT = 80;
const GRAVITY = 0.3;
const DRAG = 0.99;
const LIFE_MS = 2_600;
const FADE_FROM = 0.65;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  spin: number;
};

/** Two cannons in the lower corners, firing up and inward. */
function createParticles(width: number, height: number) {
  return Array.from({ length: PARTICLE_COUNT }, (_, index): Particle => {
    const fromLeft = index % 2 === 0;
    const degrees = (fromLeft ? -60 : -120) + (Math.random() * 40 - 20);
    const radians = (degrees * Math.PI) / 180;
    const speed = 11 + Math.random() * 9;

    return {
      x: fromLeft ? width * 0.08 : width * 0.92,
      y: height * 0.92,
      vx: Math.cos(radians) * speed,
      vy: Math.sin(radians) * speed,
      width: 6 + Math.random() * 6,
      height: 9 + Math.random() * 7,
      color: COLORS[index % COLORS.length],
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
    };
  });
}

/**
 * Fires a confetti burst every time `burstId` changes to a non-zero value.
 * Idle cost is zero: nothing is drawn and no frame is scheduled between bursts.
 */
export function ConfettiBurst({ burstId }: Readonly<{ burstId: number }>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (burstId === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    const particles = createParticles(width, height);
    const start = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = now - start;
      context.clearRect(0, 0, width, height);

      // Stop without rescheduling; the cleared canvas is the resting state.
      if (elapsed >= LIFE_MS) return;

      const fadeStart = LIFE_MS * FADE_FROM;
      const alpha =
        elapsed > fadeStart
          ? 1 - (elapsed - fadeStart) / (LIFE_MS - fadeStart)
          : 1;

      particles.forEach((particle) => {
        particle.vx *= DRAG;
        particle.vy = particle.vy * DRAG + GRAVITY;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.spin;

        context.save();
        context.globalAlpha = alpha;
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height,
        );
        context.restore();
      });

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    };
  }, [burstId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 size-full"
    />
  );
}
