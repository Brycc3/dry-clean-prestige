import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Real store footage: shows the poster still until the visitor taps play (no autoplay, no preload).
export function EditorialMedia({ image, alt, videoSrc, hero = false }: { image: string; alt: string; videoSrc?: string; hero?: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (!videoSrc) return <img src={image} alt={alt} width={720} height={1280} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} className="editorial-image"/>;
  return <><video className="editorial-image" src={videoSrc} poster={image} muted playsInline loop preload="none" aria-label={alt} ref={element => { if (element) { if (playing) void element.play().catch(() => setPlaying(false)); else element.pause(); } }}/><Button variant="gold" className="absolute bottom-4 left-4 z-10 shadow-md" aria-label={playing ? 'Pause video' : 'Play video'} onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}{playing ? 'Pause' : 'Play video'}</Button></>;
}
