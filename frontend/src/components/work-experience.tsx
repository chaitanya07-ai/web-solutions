"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ContactLink, Reveal } from "@/components/site-shell";
import { projects, type Project } from "@/lib/site";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageReveal, SplitText, useDesktopMotion } from '@/components/motion-primitives';

export function WorkIndex() {
  return <main id="main-content" className="work-index section-pad"><div className="work-index-heading"><p className="eyebrow" data-testid="work-index-eyebrow">IDEAS MADE TANGIBLE / SELECTED EXPLORATIONS</p><h1 data-testid="work-index-title">Proof of<br /><span className="lime-text">possibility.</span></h1><p data-testid="work-index-copy">Different worlds. One considered approach.<br />A collection of digital design explorations.</p></div><div className="work-index-grid">{projects.map((project, i) => <Reveal key={project.slug} className="work-index-project"><Link href={`/work/${project.slug}/`} className="project-image-link" data-cursor="VIEW" data-testid={`work-index-${project.slug}`}><img src={project.image} alt={`${project.name} digital design exploration`} width="1600" height="900" loading={i === 0 ? 'eager' : 'lazy'} /><span className="project-float-label">DESIGN EXPLORATION <ArrowUpRight size={14} /></span><span className="project-number">0{i + 1} / 04</span></Link><div className="project-caption"><div><h2 data-testid={`work-index-${project.slug}-name`}>{project.name}</h2><p data-testid={`work-index-${project.slug}-category`}>{project.category}</p></div><ArrowUpRight size={23} /></div></Reveal>)}</div></main>;
}

export function ProjectExperience({ project, nextProject }: { project: Project; nextProject: Project }) {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  return <main id="main-content" className="case-study">
    <section ref={ref} className="case-header section-pad"><motion.img className="case-intro-image" src={project.image} alt="" aria-hidden="true" fetchPriority="high" width="1600" height="900" style={desktop ? { scale: imageScale } : {}} /><Link href="/work/" className="text-link" data-testid="case-back"><ArrowLeft size={15} /> All explorations</Link><div className="case-title-row"><h1 data-testid="case-title"><SplitText text={project.name} delay={.12}/></h1><span className="eyebrow" data-testid="case-category">{project.category}<br />DESIGN EXPLORATION</span></div><div className="case-meta"><p data-testid="case-headline">{project.headline}</p><div>{project.services.map((service, i) => <span key={service} data-testid={`case-service-${i}`}>{service}</span>)}</div></div></section>
    <ImageReveal className="case-hero"><img src={project.gallery[0]} alt={`${project.name} — main website art direction`} width="1600" height="900" loading="lazy" data-testid="case-hero-image" data-cursor="EXPLORE" /></ImageReveal>
    <section className="case-story section-pad"><p className="eyebrow" data-testid="case-vision-eyebrow">01 / THE VISION</p><div><Reveal><h2 data-testid="case-vision-title">{project.headline}</h2></Reveal><p data-testid="case-description">{project.description}</p><p className="case-disclaimer" data-testid="case-disclaimer">An independent design exploration from our visual portfolio. Presented as creative direction, not a claim of a live client deployment.</p></div></section>
    <div className="case-gallery section-pad"><ImageReveal><img src={project.gallery[1]} alt={`${project.name} — extended visual identity`} width="1600" height="1000" loading="lazy" data-testid="case-gallery-0" data-cursor="EXPLORE" /></ImageReveal></div>
    <section className="case-story section-pad"><p className="eyebrow" data-testid="case-approach-eyebrow">02 / THE APPROACH</p><div><h2 data-testid="case-approach-title">Details make<br />the difference.</h2><p data-testid="case-approach-description">{project.approach}</p><ContactLink id="case-contact" className="glass-appointment" /></div></section>
    <section className="next-project section-pad"><p className="eyebrow" data-testid="next-project-eyebrow">KEEP EXPLORING</p><Link href={`/work/${nextProject.slug}/`} data-testid="next-project-link" data-cursor="VIEW"><span>{nextProject.name}</span><ArrowUpRight /><img src={nextProject.image} alt={`${nextProject.name} preview`} loading="lazy" width="240" height="160" /></Link></section>
  </main>;
}