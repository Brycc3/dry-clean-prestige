import { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Perspective tilt that follows the pointer (fine pointers only). Keyboard focus gets an equivalent lift via CSS :focus-within. */
export function Tilt({ children, className = '', max = 6, ...rest }: { children: ReactNode; className?: string; max?: number } & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduced() || !finePointer()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`); el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`); el.style.setProperty('--gx', `${(x + 0.5) * 100}%`); el.style.setProperty('--gy', `${(y + 0.5) * 100}%`); });
    };
    const leave = () => { cancelAnimationFrame(raf); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, [max]);
  return <div ref={ref} className={`tilt ${className}`} {...rest}><div className="tilt-inner">{children}</div></div>;
}

/* Sets --p (-1..1) on the element based on its position in the viewport; CSS layers translate from it. */
export function useScrollDepth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current; if (!el || reduced()) return;
    let raf = 0, visible = false;
    const update = () => { raf = 0; const r = el.getBoundingClientRect(); const vh = window.innerHeight; const p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2); el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3)); };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; if (visible) update(); });
    io.observe(el); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

/* Decorative depth layers behind a video/photo frame. Layers sit behind and outside the media, never over it. */
export function DepthFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useScrollDepth<HTMLDivElement>();
  return <div ref={ref} className={`depth-frame ${className}`}>
    <span className="depth-layer depth-layer-back" aria-hidden />
    <span className="depth-layer depth-layer-mid" aria-hidden />
    <div className="depth-front">{children}</div>
  </div>;
}
