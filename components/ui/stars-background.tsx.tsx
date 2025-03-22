"use client";
import React, { useEffect, useRef } from 'react';

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
    }> = [];

    const createStars = () => {
      stars.length = 0;
      
      const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 100);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    createStars();

    let animationFrameId: number;
    let lastUpdateTime = 0;
    const targetFPS = 30;

    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastUpdateTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      lastUpdateTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.y += star.speed;
        
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2]"
      aria-hidden="true"
    />
  );
}