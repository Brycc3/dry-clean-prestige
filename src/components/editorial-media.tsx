import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Supply an actual customer-approved video URL here when footage is available.
// No video is advertised or simulated while only editorial imagery is supplied.
export function EditorialMedia({ image, alt, videoSrc, hero = false }: { image: string; alt: string; videoSrc?: string; hero?: boolean }) {
  const [playing, setPlaying] = useState(false);
  if (!videoSrc) return <img src={image} alt={alt} width={1920} height={1280} loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} className={hero ? 'hero-media' : 'editorial-image'}/>;
  return <><video className={hero ? 'hero-media' : 'editorial-image'} src={videoSrc} poster={image} muted playsInline loop preload="none" aria-label={alt} ref={element => { if (element) { if (playing) void element.play().catch(() => setPlaying(false)); else element.pause(); } }}/><Button variant="editorial" size="icon" className="absolute bottom-5 right-5 z-10" aria-label={playing ? 'Pause video' : 'Play video'} onClick={() => setPlaying(!playing)}>{playing ? <Pause/> : <Play/>}</Button></>;
}