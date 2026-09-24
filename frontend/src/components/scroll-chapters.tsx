"use client";
import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Globe2, Search, PenTool, Code2, Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactLink } from '@/components/site-shell';
import { AmbientVideo } from '@/components/media';
import { ServiceVisual, GlassIcon } from '@/components/service-visual';
import { ImageReveal, SplitText, useDesktopMotion, cinemaEase, revealEase } from '@/components/motion-primitives';
import { projects, services, SITE, type Project } from '@/lib/site';

function ProjectScene({ project, index, active }: { project: Project; index: number; active: boolean }) {
  const desktop = useDesktopMotion();
  const x = useSpring(0, { stiffness: 110, damping: 22 });
  const y = useSpring(0, { stiffness: 110, damping: 22 });
  return <article className={`immersive-project ${active ? 'active' : ''}`}><Link className="project-scene-link" href={`/work/${project.slug}/`} data-testid={`project-${project.slug}`} data-cursor="VIEW" onPointerMove={e => { if (!desktop) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .022); y.set((e.clientY - r.top - r.height / 2) * .022); }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    <motion.img className="project-scene-image" src={project.image} alt={`${project.name} — ${project.category} design exploration`} width="1600" height="900" loading="lazy" style={desktop ? { x, y } : {}} /><div className="project-scene-shade" />
    <div className="project-scene-top"><span className="eyebrow" data-testid={`project-${project.slug}-index`}>SELECTED EXPLORATION / 0{index + 1}</span><span className="project-glass-meta" data-testid={`project-${project.slug}-category`}>{project.category}<ArrowUpRight size={14} /></span></div>
    <div className="project-scene-title"><span className="eyebrow" data-testid={`project-${project.slug}-discipline`}>{project.services.join(' / ')}</span><h3 data-testid={`project-${project.slug}-name`}><SplitText text={project.name} ready={active || !desktop} delay={.04} /></h3><div className="project-scene-bottom"><p data-testid={`project-${project.slug}-headline`}>{project.headline}</p><span className="project-open-glass">EXPLORE THE PROJECT <ArrowUpRight size={22} /></span></div></div>
  </Link></article>;
}

export function ImmersiveWork() {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion(); const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  useMotionValueEvent(scrollYProgress, 'change', p => { if (desktop) setActive(Math.min(3, Math.round(p * 3))); });
  function go(i: number) { if (!ref.current) return; const el = ref.current; const top = el.getBoundingClientRect().top + window.scrollY; window.scrollTo({ top: top + (el.offsetHeight - innerHeight) * i / 3, behavior: 'smooth' }); }
  return <section id="work" ref={ref} className={`immersive-work ${desktop ? 'pinned' : ''}`} aria-label="Selected projects" data-testid="immersive-work"><div className="immersive-work-sticky"><div className="work-editorial-heading"><p className="eyebrow" data-testid="work-eyebrow">NOT JUST SEEN.<br />FELT.</p><h2 data-testid="work-title">Worlds of<br /><span>possibility.</span></h2><Link href="/work/" data-testid="all-work-link" className="text-link">All explorations <ArrowUpRight size={17} /></Link></div><div className="immersive-track-window"><motion.div className="immersive-track" style={desktop ? { x } : {}}>{projects.map((p, i) => <ProjectScene key={p.slug} project={p} index={i} active={active === i} />)}</motion.div></div>{desktop && <div className="immersive-controls"><span className="eyebrow" data-testid="work-scroll-hint">VERTICAL SCROLL. DIFFERENT DIRECTION.</span><div className="work-dots">{projects.map((p, i) => <button key={p.slug} data-testid={`work-jump-${p.slug}`} onClick={() => go(i)} className={active === i ? 'active' : ''} aria-label={`Show ${p.name}`} aria-current={active === i ? 'true' : undefined} />)}</div><div className="work-arrows"><Button variant="ghost" size="icon" data-testid="work-previous" aria-label="Previous project" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft size={16} /></Button><Button variant="ghost" size="icon" data-testid="work-next" aria-label="Next project" disabled={active === 3} onClick={() => go(active + 1)}><ArrowRight size={16} /></Button></div></div>}</div></section>;
}

export function ScrollExpertise() {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion(); const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', p => { if (desktop) setActive(Math.min(6, Math.floor(p * 7))); });
  const service = services[active];
  function choose(i: number) { setActive(i); if (desktop && ref.current) { const el = ref.current; window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * ((i + .15) / 7), behavior: 'smooth' }); } }
  return <section id="services" ref={ref} className={`scroll-expertise ${desktop ? 'pinned' : ''}`} data-testid="scroll-expertise"><div className="expertise-stage"><div className="expertise-topline"><p className="eyebrow" data-testid="services-eyebrow">03 / CONNECTED EXPERTISE</p><span className="eyebrow" data-testid="service-visual-caption">SEVEN CAPABILITIES. ONE COMPLETE PICTURE.</span></div><div className="expertise-scene"><div className="service-narrative"><span className="service-scene-index" data-testid="service-active-index">0{active + 1}<small>/ 07</small></span><AnimatePresence mode="wait"><motion.div key={service.visual} initial={{ clipPath: 'inset(0 0 100% 0)', y: 18 }} animate={{ clipPath: 'inset(0 0 0% 0)', y: 0 }} exit={{ clipPath: 'inset(100% 0 0 0)', y: -12 }} transition={{ duration: .5, ease: cinemaEase }}><h2 data-testid="services-title">{service.title}</h2><p data-testid={`service-${service.visual}-description`}>{service.description}</p><div className="service-tags">{service.tags.map((tag, i) => <span key={tag} data-testid={`service-${service.visual}-tag-${i}`}>{tag}</span>)}</div></motion.div></AnimatePresence><ContactLink id="service-appointment" className="glass-appointment" /></div><AnimatePresence mode="wait"><motion.div className="service-scene-art" key={active} initial={{ scale: .86, rotateY: -15, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} exit={{ scale: 1.08, rotateY: 10, opacity: 0 }} transition={{ duration: .55, ease: revealEase }}><ServiceVisual type={service.visual} /></motion.div></AnimatePresence></div><nav className="service-chapter-nav" aria-label="Choose a service">{services.map((s, i) => <button key={s.visual} className={active === i ? 'active' : ''} onClick={() => choose(i)} aria-current={active === i ? 'step' : undefined} data-testid={`service-${s.visual}`}><span>0{i + 1}</span><span>{['Web','E-menus','AI','Automation','Analytics','Commerce','Care'][i]}</span><i /></button>)}</nav></div></section>;
}

export function ExpandingFilm() {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const clipPath = useTransform(scrollYProgress, [0, .45, 1], ['inset(18% 24% 18% 24% round 100px)', 'inset(0% 0% 0% 0% round 0px)', 'inset(0% 0% 0% 0% round 0px)']);
  const x = useTransform(scrollYProgress, [0, 1], ['18%', '-16%']);
  const y = useTransform(scrollYProgress, [0, 1], [90, -90]);
  return <section className="expanding-film" ref={ref}><motion.div className="expanding-film-media" style={desktop ? { clipPath } : {}}><AmbientVideo id="motion-chapter" src="/assets/motion-loop.mp4" poster="/assets/motion-poster.jpg" /><div className="expanding-film-shade" /></motion.div><motion.div className="expanding-film-type" style={desktop ? { x, y } : {}}><p data-testid="motion-title">Made to feel.</p><p data-testid="motion-subtitle">Built to perform.</p></motion.div><span className="eyebrow expanding-film-caption" data-testid="motion-label">DESIGN ISN’T WHAT IT LOOKS LIKE. IT’S WHAT IT MAKES POSSIBLE.</span></section>;
}

const steps = [
  { title: 'Discover', copy: 'First, we listen. Your ambitions, your audience and the opportunities others might miss.', icon: Search, type: 'ai' as const, word: 'THE RIGHT QUESTIONS.' },
  { title: 'Design', copy: 'Strategy takes shape. A distinctive visual direction, refined together around your brand.', icon: PenTool, type: 'web' as const, word: 'A CLEARER VISION.' },
  { title: 'Develop', copy: 'Craft meets engineering. Thoughtful interaction and a solid technical foundation, built as one.', icon: Code2, type: 'automation' as const, word: 'BUILT WITH INTENTION.' },
  { title: 'Evolve', copy: 'Launch with confidence. Then keep moving, with ongoing support and room to grow.', icon: Orbit, type: 'care' as const, word: 'ALWAYS FORWARD.' },
];
function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion(); const reduce = useReducedMotion(); const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end end'] });
  useMotionValueEvent(scrollYProgress, 'change', p => { if(desktop) setActive(Math.min(3, Math.floor(p * 4))); });
  function choose(i: number) { setActive(i); if(desktop && ref.current) { const el=ref.current; window.scrollTo({top:el.getBoundingClientRect().top+scrollY+(el.offsetHeight-innerHeight)*(i+.2)/4,behavior:'smooth'}); } }
  const step = steps[active];
  return <section className={`process-cinema ${desktop?'pinned':''}`} ref={ref} data-testid="process-timeline"><div className="process-stage"><div className="process-cinema-head"><span className="eyebrow" data-testid="process-eyebrow">FROM A QUESTION TO WHAT’S NEXT.</span><span className="eyebrow" data-testid="process-count">0{active+1} / 04</span></div><div className="process-main"><div className="process-numeral" aria-hidden="true">0{active+1}</div><div className="process-active"><span className="eyebrow" data-testid="process-active-label">{step.word}</span><h2 key={active} data-testid="process-active-title"><SplitText text={step.title} /></h2><p data-testid="process-active-description">{step.copy}</p></div><div className={`process-object process-object-${active}`}><GlassIcon type={step.type} /><step.icon className="process-object-glyph" aria-hidden="true" /></div></div><div className="timeline-rail"><motion.span style={desktop?{scaleX:scrollYProgress}:undefined} animate={!desktop?{scaleX:(active+1)/4}:undefined} transition={{duration:reduce?0:.6,ease:revealEase}} /></div><nav className="process-navigation" aria-label="Process stages">{steps.map((s,i)=><button key={s.title} onClick={()=>choose(i)} className={active===i?'active':''} aria-current={active===i?'step':undefined} data-testid={`process-${s.title.toLowerCase()}`}><span>0{i+1}</span>{s.title}<ArrowUpRight size={17}/></button>)}</nav></div></section>;
}

export function VisualStudio() {
  const ref=useRef<HTMLElement>(null); const desktop=useDesktopMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
  const imageY=useTransform(scrollYProgress,[0,1],[90,-100]);
  const textX=useTransform(scrollYProgress,[0,1],[50,-50]);
  return <><section className="visual-studio section-pad" id="studio" ref={ref}><p className="eyebrow" data-testid="studio-eyebrow">05 / INDEPENDENT BY DESIGN</p><motion.h2 style={desktop?{x:textX}:{}} data-testid="studio-title">Small by choice.<br /><span>Ambitious<br className="studio-title-break" /> by nature.</span></motion.h2><div className="studio-visual-layout"><motion.div style={desktop?{y:imageY}:{}} className="studio-visual-image" data-cursor="EXPLORE"><ImageReveal><img src="/assets/studio.webp" alt="A digital experience framed by sculptural architecture" width="1600" height="900" loading="lazy"/></ImageReveal><div className="studio-glass-caption" data-testid="studio-image-label"><span>A DIFFERENT WAY<br />OF SEEING.</span><ArrowUpRight size={20}/></div></motion.div><div className="studio-visual-story"><p className="studio-lead" data-testid="studio-lead">A close-knit digital partner.<br/>Not another layer between<br/>you and your ambition.</p><p data-testid="studio-description">We’re Web Solutions. An independent studio bringing design, development and intelligent automation together. Direct conversations. Shared curiosity. A genuine investment in what comes next for your business.</p><div className="studio-global"><Globe2 size={18}/><span data-testid="studio-global">Based in India. Connected to the world.</span></div><div className="country-list" data-testid="studio-countries">{SITE.countries.join(' / ')}</div><ContactLink id="studio-appointment" className="glass-appointment"/></div></div></section><ProcessTimeline/></>;
}