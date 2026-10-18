import React, { useEffect, useRef } from 'react';

/**
 * Interactive DotGlobe component inspired by Framer dot-globe component.
 * Renders an interactive 3D particle sphere using HTML5 Canvas with smooth rotation,
 * warm forest & terracotta particle styling, and mouse drag rotation.
 */
export function DotGlobe({
  size = 400,
  dotColor = '#1B4332',
  accentColor = '#E07A5F',
  className = '',
}) {
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0.4 });
  const autoRotateSpeed = 0.003;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Retina display scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const cx = size / 2;
    const cy = size / 2;

    // Generate points on sphere using Fibonacci sphere algorithm
    const numPoints = 380;
    const points = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numPoints; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numPoints);
      
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);

      // Randomly assign some points as highlights/destinations (terracotta)
      const isDestination = i % 19 === 0;

      points.push({ x, y, z, isDestination });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      if (!isDraggingRef.current) {
        rotationRef.current.y += autoRotateSpeed;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      // Draw subtle orbital rings
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(234, 227, 214, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sort points by z-index for proper depth
      const projected = points.map((p) => {
        // Rotate Y
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = 2.2 / (2.2 + z2);
        const px = cx + x1 * radius * scale;
        const py = cy + y2 * radius * scale;

        return {
          px,
          py,
          scale,
          z: z2,
          isDestination: p.isDestination,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      // Render dots
      projected.forEach((p) => {
        // Opacity based on depth (-1 is front, 1 is back)
        const alpha = Math.max(0.12, (1 - p.z) / 2);
        const dotRadius = p.isDestination ? 3.5 * p.scale : 1.8 * p.scale;

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, dotRadius), 0, Math.PI * 2);

        if (p.isDestination) {
          ctx.fillStyle = `rgba(224, 122, 95, ${Math.min(1, alpha + 0.3)})`;
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(27, 67, 50, ${alpha * 0.75})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse handlers for dragging/rotation
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      rotationRef.current.y += dx * 0.005;
      rotationRef.current.x += dy * 0.005;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [size, dotColor, accentColor]);

  return (
    <div className={`relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="pointer-events-auto"
      />
    </div>
  );
}

export default DotGlobe;
