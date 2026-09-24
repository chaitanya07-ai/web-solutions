"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Plus, Globe2, Code2, Workflow, Database, Cpu, Layers3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactLink, Reveal } from "@/components/site-shell";
import { AmbientVideo } from "@/components/media";
import { ServiceVisual } from "@/components/service-visual";
import { faqs, projects, services, SITE } from "@/lib/site";
import { CinematicHero } from '@/components/cinematic-hero';
import { ScrollStatement } from '@/components/motion-primitives';
import { ImmersiveWork, ScrollExpertise, ExpandingFilm, VisualStudio } from '@/components/scroll-chapters';

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  return <section ref={ref} className="hero" aria-labelledby="hero-heading">
    <div className="hero-topline"><p className="eyebrow" data-testid="hero-eyebrow"><span className="status-dot" />INDEPENDENT THINKING. EXTRAORDINARY EXECUTION.</p><span className="eyebrow hero-index" data-testid="hero-index">DIGITAL EXPERIENCES / EST. FOR THE FUTURE</span></div>
    <motion.div className="hero-film" style={reduce ? {} : { y: videoY, scale }}><AmbientVideo id="hero" priority src="/assets/hero-loop.mp4" poster="/assets/hero-poster.jpg" /><div className="film-corner" /><span className="film-label" data-testid="hero-film-label">A DIFFERENT PERSPECTIVE <Plus size={12} /></span></motion.div>
    <motion.div className="hero-title-wrap" style={reduce ? {} : { y: textY }}><h1 id="hero-heading" data-testid="hero-title"><span className="hero-line"><span>Beyond</span></span><span className="hero-line lime-text"><span>ordinary<span className="hero-period">.</span></span></span></h1><span className="hero-asterisk" aria-hidden="true">✳</span></motion.div>
    <div className="hero-bottom"><p className="hero-description" data-testid="hero-description">We bring design, technology and intelligence<br className="desktop-break" /> together. To build what your business becomes next.</p><Link href="#work" className="round-link hero-work" data-testid="hero-explore-work"><span className="round-icon"><ArrowDown size={19} /></span><span>Explore our work</span></Link>
      <Dialog><DialogTrigger render={<Button variant="ghost" className="showreel-trigger" data-testid="open-showreel"><span className="play-outline">▶</span><span>Play our film <small>00:29 / SOUND ON</small></span></Button>} /><DialogContent className="showreel-dialog"><DialogTitle className="sr-only">Web Solutions — our film</DialogTitle><video controls autoPlay playsInline preload="metadata" poster="/assets/hero-poster.jpg" data-testid="showreel-player" aria-label="Web Solutions full showreel"><source src="/assets/full-reel.webm" type="video/webm" /><source src="/assets/hero-bg.mp4" type="video/mp4" /></video></DialogContent></Dialog>
    </div>
    <div className="hero-baseline"><span data-testid="hero-baseline-design">DESIGN-LED. FUTURE-READY.</span><div className="baseline-lines" aria-hidden="true" /><span data-testid="hero-baseline-scroll">SCROLL TO DISCOVER <ArrowDown size={11} /></span></div>
  </section>;
}

function Introduction() {
  return <section className="introduction section-pad"><div className="section-label"><span className="tiny-cross">+</span><span className="eyebrow" data-testid="intro-label">01 / THE BIG PICTURE</span></div><div className="intro-content"><Reveal><h2 data-testid="intro-title">Not just a presence.<br />A <span className="muted-text">lasting</span> impression.</h2></Reveal><div className="intro-lower"><p data-testid="intro-copy">The best digital experiences don’t just look different. They think differently. We bring a designer’s eye and an engineer’s mind to websites, products and intelligent systems.</p><Link href="#services" className="text-link" data-testid="intro-expertise">Discover our expertise <ArrowUpRight size={17} /></Link></div></div></section>;
}

function SelectedWork() {
  const section = useRef<HTMLElement>(null);
  const [wide, setWide] = useState(false);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => { const media = window.matchMedia('(min-width: 900px)'); const update = () => setWide(media.matches); update(); media.addEventListener('change', update); return () => media.removeEventListener('change', update); }, []);
  const pinned = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  useMotionValueEvent(scrollYProgress, 'change', v => setActive(Math.min(3, Math.round(v * 3))));
  function jump(index: number) { if (!section.current) return; const top = section.current.getBoundingClientRect().top + window.scrollY; window.scrollTo({ top: top + (section.current.offsetHeight - window.innerHeight) * (index / 3), behavior: reduce ? 'auto' : 'smooth' }); }
  return <section ref={section} id="work" className={`selected-work ${pinned ? 'is-pinned' : ''}`} aria-labelledby="work-heading"><div className="work-sticky">
    <div className="work-heading"><div><p className="eyebrow" data-testid="work-eyebrow">02 / SELECTED EXPLORATIONS</p><h2 id="work-heading" data-testid="work-title">Different by <span>design.</span></h2></div><Link href="/work/" className="text-link" data-testid="all-work-link">All work <span className="counter">04</span><ArrowUpRight size={18} /></Link></div>
    <div className="project-viewport"><motion.div className="project-track" style={pinned ? { x } : {}}>{projects.map((project, i) => <article key={project.slug} className="project-slide"><Link href={`/work/${project.slug}/`} data-testid={`project-${project.slug}`} data-cursor="VIEW" className="project-image-link"><img src={project.image} alt={`${project.name} — ${project.category} digital design exploration`} loading="lazy" width="1600" height="900" /><span className="project-float-label">DESIGN EXPLORATION <ArrowUpRight size={14} /></span><span className="project-number">0{i + 1} / 04</span><span className="project-view-circle"><ArrowUpRight size={25} /></span></Link><div className="project-caption"><div><h3 data-testid={`project-${project.slug}-name`}>{project.name}</h3><p data-testid={`project-${project.slug}-category`}>{project.category}</p></div><span className="project-discipline" data-testid={`project-${project.slug}-discipline`}>{project.services.slice(0, 2).join(' / ')}</span></div></article>)}</motion.div></div>
    {pinned && <div className="work-controls"><span className="eyebrow" data-testid="work-scroll-hint">SCROLL TO EXPLORE <ArrowRight size={14} /></span><div className="work-dots">{projects.map((p, i) => <button key={p.slug} className={active === i ? 'active' : ''} onClick={() => jump(i)} aria-label={`Show ${p.name}`} aria-current={active === i ? 'true' : undefined} data-testid={`work-jump-${p.slug}`} />)}</div><div className="work-arrows"><Button variant="ghost" size="icon" disabled={active === 0} onClick={() => jump(active - 1)} data-testid="work-previous" aria-label="Previous project"><ArrowLeft size={16} /></Button><Button variant="ghost" size="icon" disabled={active === 3} onClick={() => jump(active + 1)} data-testid="work-next" aria-label="Next project"><ArrowRight size={16} /></Button></div></div>}
  </div></section>;
}

function Expertise() {
  const [active, setActive] = useState(0);
  return <section className="expertise section-pad" id="services"><div className="section-heading"><p className="eyebrow" data-testid="services-eyebrow">03 / OUR EXPERTISE</p><Reveal><h2 data-testid="services-title">A connected world.<br /><span className="muted-text">A complete approach.</span></h2></Reveal><p className="section-lede" data-testid="services-lede">From your first impression to your next evolution.<br />Everything works better when it works together.</p></div>
    <div className="expertise-layout"><div className="service-list">{services.map((service, i) => <div className={`service-row ${active === i ? 'is-active' : ''}`} key={service.title}><Button variant="ghost" onClick={() => setActive(i)} className="service-trigger" aria-expanded={active === i} aria-controls={`service-panel-${i}`} data-testid={`service-${service.visual}`}><span className="service-number">0{i + 1}</span><span>{service.title}</span><ArrowUpRight size={21} /></Button><div className="service-panel" id={`service-panel-${i}`} hidden={active !== i}><p data-testid={`service-${service.visual}-description`}>{service.description}</p><div className="service-tags">{service.tags.map((tag, j) => <span key={tag} data-testid={`service-${service.visual}-tag-${j}`}>{tag}</span>)}</div><ContactLink id={`service-${service.visual}-inquire`} className="service-contact">Let’s explore this</ContactLink></div></div>)}</div><div className="service-art"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .35 }}><ServiceVisual type={services[active].visual} /></motion.div></AnimatePresence><p className="eyebrow" data-testid="service-visual-caption"><span>FORM. FUNCTION. FORWARD.</span><span>0{active + 1} / 07</span></p></div></div>
  </section>;
}

function MotionChapter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.84, 1, 1.04]);
  return <section className="motion-chapter" ref={ref}><motion.div className="motion-film" style={reduce ? {} : { scale }}><AmbientVideo id="motion-chapter" src="/assets/motion-loop.mp4" poster="/assets/motion-poster.jpg" /><div className="motion-caption"><span className="eyebrow" data-testid="motion-label">IDEAS DESERVE TO MOVE.</span><h2 data-testid="motion-title">Made to feel.<br />Built to perform.</h2><span className="motion-caption-end" data-testid="motion-caption">THE ART OF WHAT’S POSSIBLE ↗</span></div></motion.div></section>;
}

const technologies = [
  { name: 'Web', icon: Code2, description: 'Fast foundations. Fluid experiences. Purpose-built websites that feel effortless on every screen.', tags: 'NEXT.JS / REACT / TYPESCRIPT' },
  { name: 'Intelligence', icon: Cpu, description: 'Thoughtful AI assistants that understand your business and make every customer conversation count.', tags: 'AI ASSISTANTS / LANGUAGE / VOICE' },
  { name: 'Automation', icon: Workflow, description: 'Connected workflows that take care of the repetitive, so your team can focus on the remarkable.', tags: 'WORKFLOWS / MESSAGING / BOOKING' },
  { name: 'Data', icon: Database, description: 'Turn complexity into clarity with intuitive dashboards, connected customer journeys and meaningful insights.', tags: 'CRM / ANALYTICS / DASHBOARDS' },
  { name: 'Design', icon: Layers3, description: 'The right details, in the right places. Cohesive visual systems that make your brand unmistakably yours.', tags: 'UI / UX / DESIGN SYSTEMS' },
];
function Technology() {
  const [active, setActive] = useState(0);
  const Icon = technologies[active].icon;
  return <section className="technology section-pad"><div className="technology-copy"><p className="eyebrow" data-testid="technology-eyebrow">04 / THE INTELLIGENCE BEHIND IT</p><h2 data-testid="technology-title">Human ideas.<br /><span className="muted-text">Intelligent systems.</span></h2><p data-testid="technology-copy">Technology should make life simpler. We connect the right tools to build experiences that do more, without asking more of you.</p><ContactLink id="technology-contact" className="outline">Build something smarter</ContactLink></div><div className="ecosystem"><div className="ecosystem-orbit" aria-hidden="true" /><div className="ecosystem-orbit inner" aria-hidden="true" /><div className="ecosystem-core" aria-hidden="true"><Icon strokeWidth={1} /></div><div className="ecosystem-nodes" role="tablist" aria-label="Technology ecosystem">{technologies.map((tech, i) => <Button key={tech.name} variant="ghost" role="tab" aria-selected={i === active} aria-controls="technology-detail" className={`ecosystem-node node-${i} ${i === active ? 'active' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} data-testid={`technology-${tech.name.toLowerCase()}`}><tech.icon size={20} strokeWidth={1.4} /><span>{tech.name}</span></Button>)}</div><div className="ecosystem-detail" id="technology-detail" role="tabpanel" aria-live="polite"><p data-testid="technology-active-description">{technologies[active].description}</p><span className="eyebrow" data-testid="technology-active-tags">{technologies[active].tags}</span></div></div></section>;
}

const processSteps = [
  { name: 'Discover', detail: 'First, we listen. Your ambitions, your audience and the opportunities others might miss.' },
  { name: 'Design', detail: 'Strategy takes shape. A distinctive visual direction, refined together around your brand.' },
  { name: 'Develop', detail: 'Craft meets engineering. Thoughtful interaction and a solid technical foundation, built as one.' },
  { name: 'Evolve', detail: 'Launch with confidence. Then keep moving, with ongoing support and room to grow.' },
];
function Studio() {
  const [step, setStep] = useState(0);
  return <section className="studio section-pad" id="studio"><p className="eyebrow" data-testid="studio-eyebrow">05 / THE STUDIO</p><Reveal><h2 data-testid="studio-title">Small by choice.<br /><span className="muted-text">Ambitious by nature.</span></h2></Reveal><div className="studio-layout"><div className="studio-image" data-cursor="EXPLORE"><img src="/assets/studio.webp" alt="Architectural composition of a digital website on a sculptural pedestal" width="1600" height="900" loading="lazy" /><span data-testid="studio-image-label">A DIFFERENT WAY OF SEEING.</span></div><div className="studio-story"><p className="studio-lead" data-testid="studio-lead">A close-knit digital partner.<br />Not another layer between<br />you and your ambition.</p><p data-testid="studio-description">We’re Web Solutions. An independent studio bringing design, development and intelligent automation together. Direct conversations. Shared curiosity. A genuine investment in what comes next for your business.</p><div className="studio-global"><Globe2 size={18} /><span data-testid="studio-global">Based in India. Connected to the world.</span></div><div className="country-list" data-testid="studio-countries">{SITE.countries.join(' / ')}</div></div></div>
    <div className="process-heading"><p className="eyebrow" data-testid="process-eyebrow">GOOD WORK STARTS WITH A GOOD PROCESS.</p><span className="eyebrow" data-testid="process-count">FOUR STEPS. ONE SHARED VISION.</span></div><div className="process-steps">{processSteps.map((item, i) => <button key={item.name} className={`process-step ${step === i ? 'active' : ''}`} onClick={() => setStep(i)} aria-expanded={step === i} data-testid={`process-${item.name.toLowerCase()}`}><span className="eyebrow">0{i + 1}</span><span className="process-name">{item.name}<ArrowUpRight size={22} /></span><span className="process-detail">{item.detail}</span></button>)}</div>
  </section>;
}

const quotes = [
  { quote: "The free sample sold me before the first call ended. Three weeks after launch, our Saturday bookings had doubled — the website genuinely paid for itself within a month.", name: 'Priya Sharma', role: 'Owner, Saffron House · India' },
  { quote: "I've hired agencies at three times the budget that delivered half this quality. The admin dashboard alone saves my manager an hour every single day.", name: 'James Whitfield', role: 'Director, The Crown Bistro · United Kingdom' },
  { quote: "They understood cafe culture better than the agencies here in Sydney. Our regulars order ahead now, and the queue complaints just… stopped.", name: 'Sarah Mitchell', role: 'Founder, Brew & Co · Australia' },
];
function Testimonials() {
  const [index, setIndex] = useState(0);
  return <section className="testimonials section-pad"><div className="section-label"><span className="tiny-cross">+</span><p className="eyebrow" data-testid="testimonials-eyebrow">IN GOOD COMPANY</p></div><div className="quote-content" aria-live="polite"><span className="quote-mark" aria-hidden="true">“</span><blockquote data-testid="testimonial-quote">{quotes[index].quote}</blockquote><div className="quote-bottom"><div><p data-testid="testimonial-name">{quotes[index].name}</p><span data-testid="testimonial-role">{quotes[index].role}</span></div><div className="quote-controls"><span className="eyebrow" data-testid="testimonial-count">0{index + 1} / 03</span><Button variant="ghost" size="icon" className="circle-control" data-testid="testimonial-previous" aria-label="Previous testimonial" onClick={() => setIndex((index + 2) % 3)}><ArrowLeft size={18} /></Button><Button variant="ghost" size="icon" className="circle-control" data-testid="testimonial-next" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % 3)}><ArrowRight size={18} /></Button></div></div></div></section>;
}
function FAQ() { return <section className="faq section-pad"><div><p className="eyebrow" data-testid="faq-eyebrow">A LITTLE CLARITY</p><h2 data-testid="faq-title">Good questions.<br /><span className="muted-text">Honest answers.</span></h2></div><div className="faq-list">{faqs.map((faq, i) => <details key={faq.q} data-testid={`faq-item-${i}`}><summary data-testid={`faq-question-${i}`}>{faq.q}<Plus size={18} /></summary><p data-testid={`faq-answer-${i}`}>{faq.a}</p></details>)}</div></section>; }

export function HomeExperience() { return <main id="main-content"><CinematicHero /><Introduction /><ImmersiveWork /><ScrollStatement /><ScrollExpertise /><ExpandingFilm /><Technology /><VisualStudio /><Testimonials /><FAQ /></main>; }