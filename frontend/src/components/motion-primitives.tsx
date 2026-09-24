"use client";
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export const cinemaEase = [.76, 0, .24, 1] as const;
export const revealEase = [.22, 1, .36, 1] as const;

export function useDesktopMotion() {
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  useEffect(() => { const media = matchMedia('(min-width: 900px)'); const update = () => setDesktop(media.matches); update(); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, []);
  return desktop && !reduce;
}

export function SplitText({ text, ready = true, delay = 0, className = '', id }: { text: string; ready?: boolean; delay?: number; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  return <span className={`split-text ${className}`} aria-label={text} data-testid={id}>{text.split(' ').map((word, wi) => <span className="split-word" key={`${wi}-${word}`} aria-hidden="true">{Array.from(word).map((char, ci) => <motion.span key={ci} initial={reduce ? false : { y: '110%', rotateX: 55, filter: 'blur(8px)' }} animate={ready ? { y: '0%', rotateX: 0, filter: 'blur(0px)' } : { y: '110%', rotateX: 55, filter: 'blur(8px)' }} transition={{ duration: reduce ? 0 : 1.05, delay: reduce ? 0 : delay + wi * .14 + ci * .028, ease: revealEase }}>{char}</motion.span>)}{wi < text.split(' ').length - 1 && <span className="word-space">&nbsp;</span>}</span>)}</span>;
}

export function ImageReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={`image-mask ${className}`} initial={reduce ? false : { clipPath: 'inset(12% 7% 12% 7% round 24px)' }} whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }} viewport={{ once: true, amount: .2 }} transition={{ duration: 1.3, ease: cinemaEase }}>{children}</motion.div>;
}

export function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['12%', '-15%']);
  const reverse = useTransform(scrollYProgress, [0, 1], ['-18%', '12%']);
  return <section className="scroll-statement" ref={ref} aria-label="Independent minds. Extraordinary outcomes."><motion.p style={desktop ? { x } : {}} data-testid="statement-first">INDEPENDENT <span>MINDS.</span></motion.p><motion.p style={desktop ? { x: reverse } : {}} data-testid="statement-second"><span>EXTRAORDINARY</span> OUTCOMES.</motion.p><div className="statement-detail"><span className="eyebrow" data-testid="statement-label">DESIGN × TECHNOLOGY × INTELLIGENCE</span><span aria-hidden="true">↗</span></div></section>;
}