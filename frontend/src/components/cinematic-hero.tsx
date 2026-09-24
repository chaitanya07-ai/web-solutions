"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { ArrowDown, ArrowUpRight, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { AmbientVideo } from '@/components/media';
import { ContactLink } from '@/components/site-shell';
import { SplitText, useDesktopMotion, cinemaEase, revealEase } from '@/components/motion-primitives';

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useDesktopMotion();
  const [opening, setOpening] = useState(true);
  const [ready, setReady] = useState(false);
  const [ending, setEnding] = useState(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const finish = useCallback(() => { try { sessionStorage.setItem('ws-opening-seen', '1'); } catch {} setOpening(false); setReady(true); document.documentElement.dataset.opening = 'complete'; }, []);
  useEffect(() => {
    let seen = false; try { seen = sessionStorage.getItem('ws-opening-seen') === '1'; } catch {}
    if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches || window.location.hash) { finish(); return; }
    document.documentElement.dataset.opening = 'active';
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(finish, 3300);
    return () => { clearTimeout(timer); document.body.style.overflow = old; document.documentElement.dataset.opening = 'complete'; };
  }, [finish]);
  useEffect(() => { if (!opening) document.body.style.overflow = ''; }, [opening]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', progress => setEnding(progress > .7));
  const textX = useTransform(scrollYProgress, [0, .7], ['0%', '-26%']);
  const textX2 = useTransform(scrollYProgress, [0, .7], ['0%', '20%']);
  const titleOpacity = useTransform(scrollYProgress, [0, .45, .7], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1.23]);
  const videoMask = useTransform(scrollYProgress, [0, .75, 1], ['inset(0% 0% 0% 0% round 0px)', 'inset(0% 0% 0% 0% round 0px)', 'inset(0% 4.6% 0% 4.6% round 24px)']);
  const endingOpacity = useTransform(scrollYProgress, [.58, .82, 1], [0, 1, 1]);
  const endingY = useTransform(scrollYProgress, [.55, 1], [70, 0]);
  const pointerX = useSpring(0, { stiffness: 90, damping: 20 });
  const pointerY = useSpring(0, { stiffness: 90, damping: 20 });
  return <section ref={ref} className={`cinema-hero ${desktop ? 'desktop-motion' : ''}`} aria-labelledby="cinema-heading" data-testid="cinematic-hero">
    <AnimatePresence>{opening && <motion.div className="opening-scene" role="dialog" aria-label="Web Solutions cinematic introduction" aria-modal="true" data-testid="opening-sequence" onKeyDown={e => { if(e.key==='Escape') finish(); if(e.key==='Tab') { e.preventDefault(); skipRef.current?.focus(); } }} initial={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }} exit={{ clipPath: 'inset(0% 0% 100% 0% round 0px)' }} transition={{ duration: reduce ? 0 : .8, ease: cinemaEase }}>
      <motion.div className="opening-identity" initial={{ opacity: 0, scale: .95, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.5, delay: .2, ease: revealEase }}><img src="/assets/brand-logo-clear.webp" alt="Web Solutions" width="340" height="101" data-testid="opening-logo" /><span className="identity-reflection" aria-hidden="true" /><span className="identity-edge" aria-hidden="true" /></motion.div>
      <Button ref={skipRef} autoFocus className="skip-opening" variant="ghost" onClick={finish} data-testid="skip-opening">Skip intro <ArrowUpRight size={13} /></Button>
    </motion.div>}</AnimatePresence>
    <div className="cinema-stage" onPointerMove={e => { if (!desktop) return; const box = e.currentTarget.getBoundingClientRect(); pointerX.set((e.clientX / box.width - .5) * 18); pointerY.set((e.clientY / box.height - .5) * 10); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.div className="cinema-video-mask" style={desktop ? { clipPath: videoMask } : {}}><motion.div className="cinema-video-enter" initial={reduce ? false : { clipPath: 'inset(20% 28% 20% 28% round 40px)' }} animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 0px)' } : { clipPath: 'inset(20% 28% 20% 28% round 40px)' }} transition={{ duration: 1.65, ease: cinemaEase }}><motion.div className="cinema-video-scale" style={desktop ? { scale } : {}}><AmbientVideo id="hero" priority src="/assets/hero-loop.mp4" poster="/assets/hero-poster.jpg" /></motion.div></motion.div><div className="cinema-shade" /></motion.div>
      <motion.div className="cinema-overline" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: .7, duration: 1 }}><p className="eyebrow" data-testid="hero-eyebrow"><span className="status-dot" />INDEPENDENT MINDS. EXTRAORDINARY POSSIBILITIES.</p><span className="eyebrow" data-testid="hero-film-label">WEB SOLUTIONS® / DIGITAL EXPERIENCE STUDIO</span></motion.div>
      <motion.div className={`cinema-heading-position ${desktop && ending ? 'chapter-exited' : ''}`} style={desktop ? { x: pointerX, y: pointerY, opacity: titleOpacity } : {}}><h1 id="cinema-heading" aria-label="Beyond ordinary." data-testid="hero-title"><motion.span className="cinema-title-line" style={desktop ? { x: textX } : {}}><SplitText text="Beyond" ready={ready} delay={.3} /></motion.span><motion.span className="cinema-title-line second" style={desktop ? { x: textX2 } : {}}><SplitText text="ordinary." ready={ready} delay={.48} /></motion.span></h1><motion.div className="hero-glass-note" initial={{ opacity: 0, y: 25, rotate: -4 }} animate={ready ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0 }} transition={{ duration: .9, delay: 1.15, ease: revealEase }} data-testid="hero-glass-note"><span className="glass-note-symbol" aria-hidden="true"><svg viewBox="0 0 60 60"><path d="M30 2v56M2 30h56M10 10l40 40M10 50 50 10" /></svg></span><span>DESIGNED TO FEEL.<br />ENGINEERED TO MATTER.</span></motion.div></motion.div>
      <motion.div className="cinema-bottom" initial={{ opacity: 0, y: 14 }} animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ duration: .8, delay: 1.35, ease: revealEase }} style={desktop ? { opacity: titleOpacity } : {}}><p data-testid="hero-description">Design, technology and intelligence.<br />A different kind of digital.</p><ContactLink id="hero-appointment" className="glass-appointment" /><Dialog><DialogTrigger render={<Button variant="ghost" className="cinema-play" data-testid="open-showreel"><Play size={13} /><span>THE STUDIO FILM<small>00:29 / SOUND ON</small></span></Button>} /><DialogContent className="showreel-dialog" showCloseButton={false}><DialogTitle className="sr-only">Web Solutions — studio film</DialogTitle><DialogClose render={<Button variant="ghost" size="icon" aria-label="Close film" data-testid="close-showreel"><X size={18} /></Button>} /><video controls autoPlay playsInline preload="metadata" poster="/assets/hero-poster.jpg" data-testid="showreel-player"><source src="/assets/full-reel.webm" type="video/webm" /><source src="/assets/hero-bg.mp4" type="video/mp4" /></video></DialogContent></Dialog></motion.div>
      <Link href="#work" className="cinema-scroll" data-testid="hero-explore-work"><span>SCROLL INTO POSSIBILITY</span><ArrowDown size={13} /></Link>
      <AnimatePresence>{desktop && ending && <motion.div className="cinema-ending" initial={{ opacity:0, clipPath:'inset(100% 0 0 0)' }} animate={{ opacity:1, clipPath:'inset(0% 0 0 0)' }} exit={{ opacity:0 }} transition={{ duration:.65, ease:revealEase }} style={{ y: endingY }}><span className="eyebrow" data-testid="hero-ending-label">THIS IS WHERE IDEAS BECOME EXPERIENCES.</span><p data-testid="hero-ending-title">A different<br /><span>perspective.</span></p><ArrowDown size={26} /></motion.div>}</AnimatePresence>
    </div>
  </section>;
}