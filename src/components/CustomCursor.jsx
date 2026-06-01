import React, { useEffect, useRef } from 'react';

/**
 * codedgar.com-style custom cursor: a small dot that tracks the pointer 1:1,
 * plus a square ring that trails behind with easing and expands over interactive
 * elements. Uses mix-blend-difference so it stays visible on light and dark
 * backgrounds alike. Disabled on touch / coarse pointers and reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let visible = false;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '0.7';
      }
    };

    const isInteractive = (el) => el && el.closest('a, button, [role="button"], input, textarea, label, summary');
    const onOver = (e) => ring.classList.toggle('cc-ring--active', !!isInteractive(e.target));
    const onLeave = () => { visible = false; dot.style.opacity = '0'; ring.style.opacity = '0'; };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.classList.add('cc-active');
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('cc-active');
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="cc-root">
      <div ref={dotRef} className="cc-dot" />
      <div ref={ringRef} className="cc-ring" />
    </div>
  );
}
