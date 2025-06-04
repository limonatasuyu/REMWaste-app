import { useEffect, type RefObject } from "react";
import type { ISkipData } from "../types";

interface ConfettiParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  color: string;
}

export function useConfetti({
  canvasRef,
  item,
}: {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  item: ISkipData | null;
}) {
  useEffect(() => {
    if (!item || !canvasRef?.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const confettiCount = 150;
    const gravity = 0.5;
    const friction = 0.98;

    let confetti: ConfettiParticle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initConfetti = () => {
      confetti = Array.from({ length: confettiCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 6 + 4,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 + 2,
        rotation: Math.random() * 360,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((p) => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += gravity;
        p.speedX *= friction;
        p.rotation += 5;

        if (p.y > canvas.height) {
          p.y = Math.random() * -canvas.height;
          p.x = Math.random() * canvas.width;
          p.speedY = Math.random() * 4 + 2;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    initConfetti();
    draw();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [item]);
}
