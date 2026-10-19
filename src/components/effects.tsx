import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent, type PointerEvent } from 'react';
import { money } from '@/lib/business';

/* 1) Hanging garment conveyor: photorealistic cutouts, seamless loop (two identical sets), pauses on hover/focus. */
import shirtWhite from '@/assets/garment-shirt.webp';
import shirtBlue from '@/assets/garment-shirt-blue.webp';
import pants from '@/assets/garment-pants.webp';
import jacket from '@/assets/garment-jacket.webp';
import dress from '@/assets/garment-dress.webp';
const garments = [shirtWhite, pants, jacket, dress, shirtBlue, pants, jacket, shirtWhite, dress, shirtBlue];
export function GarmentConveyor() {
  const item = (src: string, i: number, dup: boolean) => <li key={`${dup ? 'b' : 'a'}${i}`} className="garment" aria-hidden={dup || undefined} style={{ animationDelay: `${-i * 0.37}s` }}>
    <img src={src} alt="" width={672} height={992} loading="lazy" decoding="async" draggable={false} className="garment-img" />
  </li>;
  return <div className="conveyor" role="img" aria-label="Shirts, trousers, jackets and dresses on hangers moving along a dry cleaning conveyor rail (stock-style images, not store photos)" tabIndex={0}>
    <div className="conveyor-rail" />
    <ul className="conveyor-track">{garments.map((g, i) => item(g, i, false))}{garments.map((g, i) => item(g, i, true))}</ul>
  </div>;
}

/* 2) Garment press with steam wisps. */
export function SteamPress() {
  return <figure className="press-figure">
    <svg viewBox="0 0 240 180" className="press-svg" role="img" aria-label="Illustration of a garment press releasing steam">
      <g className="steam" fill="none" stroke="var(--steam)" strokeWidth="6" strokeLinecap="round">
        <path className="wisp wisp-1" d="M90 70 q-10 -15 0 -30 q10 -15 0 -30" />
        <path className="wisp wisp-2" d="M120 70 q10 -15 0 -30 q-10 -15 0 -30" />
        <path className="wisp wisp-3" d="M150 70 q-10 -15 0 -30 q10 -15 0 -30" />
      </g>
      <rect x="50" y="72" width="140" height="22" rx="10" fill="var(--press-top)" />
      <rect x="110" y="62" width="20" height="12" rx="3" fill="var(--press-top)" />
      <rect x="40" y="100" width="160" height="16" rx="8" fill="var(--garment-1)" stroke="var(--garment-line)" />
      <rect x="60" y="116" width="120" height="40" fill="var(--press-base)" />
      <rect x="30" y="156" width="180" height="12" rx="4" fill="var(--press-base)" />
    </svg>
    <figcaption className="media-caption">Illustration · garment press</figcaption>
  </figure>;
}

/* 3) Before/after stain slider — illustrative only. */
export function StainSlider() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const fromPointer = (e: PointerEvent) => { const r = ref.current!.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))); };
  const onKey = (e: KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    const map: Record<string, number> = { ArrowLeft: pos - step, ArrowDown: pos - step, ArrowRight: pos + step, ArrowUp: pos + step, Home: 0, End: 100 };
    if (e.key in map) { e.preventDefault(); setPos(Math.max(0, Math.min(100, map[e.key] ?? pos))); }
  };
  const shirt = (stained: boolean) => <svg viewBox="0 0 300 200" className="stain-svg" aria-hidden="true">
    <rect width="300" height="200" fill="var(--paper)" />
    <path d="M70 40 L130 22 L150 40 L170 22 L230 40 L260 90 L228 104 L222 80 L222 190 L78 190 L78 80 L72 104 L40 90 Z" fill="var(--garment-1)" stroke="var(--garment-line)" strokeWidth="2" />
    <path d="M150 40 V188" stroke="var(--garment-line)" strokeDasharray="3 10" />
    {stained && <g fill="var(--stain)"><ellipse cx="120" cy="110" rx="22" ry="15" opacity=".75" /><circle cx="140" cy="128" r="7" opacity=".6" /><ellipse cx="185" cy="80" rx="12" ry="8" opacity=".55" /><circle cx="196" cy="150" r="10" opacity=".5" /></g>}
  </svg>;
  return <div className="stain-wrap">
    <div ref={ref} className="stain-slider" onPointerDown={e => { (e.target as Element).setPointerCapture?.(e.pointerId); fromPointer(e); }} onPointerMove={e => { if (e.buttons) fromPointer(e); }}>
      {shirt(false)}
      <div className="stain-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>{shirt(true)}</div>
      <span className="stain-label left">Before</span><span className="stain-label right">After</span>
      <div className="stain-handle" style={{ left: `${pos}%` }} role="slider" tabIndex={0} aria-label="Before and after comparison" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)}% showing before`} onKeyDown={onKey}><span>⇆</span></div>
    </div>
    <p className="fine-print mt-3"><strong>Illustration only.</strong> Not an actual store result. Stain removal depends on the fabric and stain — ask at the counter.</p>
  </div>;
}

/* 4) Staggered scroll reveal using IntersectionObserver. */
export function Reveal({ children, index = 0, className = '' }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`scroll-reveal ${shown ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${index * 90}ms` }}>{children}</div>;
}

/* 5) Animated money value (tweens cents). */
function useTween(target: number, ms = 350) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); from.current = target; return; }
    const start = performance.now(); const a = from.current; let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - start) / ms); const e = 1 - Math.pow(1 - p, 3); const v = Math.round(a + (target - a) * e); setValue(v); from.current = v; if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}
export function AnimatedRange({ min, max }: { min: number; max: number }) {
  const a = useTween(min); const b = useTween(max);
  const [bump, setBump] = useState(0);
  useEffect(() => { setBump(n => n + 1); }, [min, max]);
  return <span key={bump} className="num-pop tabular-nums">{min === max ? money(a) : `${money(a)}–${money(b)}`}</span>;
}
