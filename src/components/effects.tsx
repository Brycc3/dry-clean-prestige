import { useEffect, useRef, useState, type ReactNode } from 'react';
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
  return <div className="conveyor" role="img" aria-label="Shirts, trousers, jackets and dresses on hangers moving along a dry cleaning conveyor rail (computer-generated product-style images, not photos from this store)" tabIndex={0}>
    <div className="conveyor-rail" />
    <ul className="conveyor-track">{garments.map((g, i) => item(g, i, false))}{garments.map((g, i) => item(g, i, true))}</ul>
  </div>;
}

/* 2) Pressing photo + 3) static before/after photo pair. Illustrative stock-style images, not store results. */
import pressPhoto from '@/assets/press-photo.jpg';
import shirtStained from '@/assets/shirt-stained.jpg';
import shirtClean from '@/assets/shirt-clean.jpg';
export function SteamPress() {
  return <figure className="m-0">
    <div className="photo-card press-photo"><img src={pressPhoto} alt="A white dress shirt being pressed on a commercial garment press" width={1024} height={768} loading="lazy" decoding="async" /></div>
    <figcaption className="media-caption">Illustrative example · not photographed at this store</figcaption>
  </figure>;
}
export function StainSlider() {
  return <div>
    <div className="ba-pair">
      <figure className="photo-card"><img src={shirtStained} alt="White shirt with coffee and food stains" width={816} height={816} loading="lazy" decoding="async" /><span className="ba-tag">Before</span></figure>
      <figure className="photo-card"><img src={shirtClean} alt="Clean, pressed and folded white shirt" width={816} height={816} loading="lazy" decoding="async" /><span className="ba-tag">After</span></figure>
    </div>
    <p className="fine-print mt-3"><strong>Illustrative example.</strong> Computer-generated sample images, not an actual store or customer result. Stain removal depends on the fabric and stain — ask at the counter.</p>
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
