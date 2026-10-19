import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Real store footage: muted, looping autoplay; paused by default for prefers-reduced-motion. Visitors can always pause/play.
export function EditorialMedia({ image, alt, videoSrc, hero = false }: { image: string; alt: string; videoSrc?: string; hero?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false);
  }, []);
  useEffect(() => {
    const v = ref.current; if (!v) return;
    v.muted = true;
    if (playing) void v.play().catch(() => setPlaying(false)); else v.pause();
  }, [playing]);
  if (!videoSrc) return <img src={image} alt={alt} width={720} height={1280} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} className="editorial-image"/>;
  return <><video ref={ref} className="editorial-image" src={videoSrc} poster={image} autoPlay muted loop playsInline preload="metadata" aria-label={alt}/><Button variant="gold" className="absolute bottom-4 left-4 z-10 shadow-md" aria-label={playing ? 'Pause video' : 'Play video'} onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}{playing ? 'Pause' : 'Play video'}</Button></>;
}
