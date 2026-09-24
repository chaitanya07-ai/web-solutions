"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AmbientVideo({ src, poster, id, className = '', priority = false }: { src: string; poster: string; id: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(priority);
  const manual = useRef(false);
  useEffect(() => {
    const video = ref.current; if (!video) return;
    if (loaded) video.load();
    const observer = new IntersectionObserver(entries => {
      const visible = entries[0].isIntersecting;
      if (visible) setLoaded(true);
      if (visible && !reduce && !manual.current) { void video.play().catch(() => setPaused(true)); }
      else video.pause();
    }, { rootMargin: '100px', threshold: .05 });
    observer.observe(video);
    if (reduce) { video.pause(); setPaused(true); }
    return () => observer.disconnect();
  }, [reduce, loaded]);
  async function toggle() { const v = ref.current; if (!v) return; if (v.paused) { manual.current = false; await v.play().catch(() => setPaused(true)); } else { manual.current = true; v.pause(); } }
  return <div className={`ambient-video ${className}`}><video ref={ref} poster={poster} muted loop playsInline preload={priority ? 'auto' : 'none'} autoPlay={priority && !reduce} onPlay={() => setPaused(false)} onPause={() => setPaused(true)} data-testid={`${id}-video`} aria-label="Web Solutions design motion reel">{loaded && <><source src={src.replace('.mp4', '.webm')} type="video/webm" /><source src={src} type="video/mp4" /></>}</video><Button variant="ghost" size="icon" className="video-toggle" aria-label={paused ? 'Play video' : 'Pause video'} onClick={() => void toggle()} data-testid={`${id}-toggle`}>{paused ? <Play size={14} /> : <Pause size={14} />}</Button></div>;
}