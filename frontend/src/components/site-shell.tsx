"use client";

import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useReducedMotion, useSpring, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { GOOGLE_FORM_URL, SITE } from "@/lib/site";
import { Toaster, toast } from "sonner";
import { SplitText, useDesktopMotion } from "@/components/motion-primitives";

export function ContactLink({ id, className = "" }: { children?: ReactNode; id: string; className?: string }) {
  const x = useSpring(0, { stiffness: 170, damping: 26 });
  const y = useSpring(0, { stiffness: 170, damping: 26 });
  const reduce = useReducedMotion();
  const configured = /^https:\/\//.test(GOOGLE_FORM_URL);
  const label = id === 'header-contact' || id === 'mobile-contact' ? 'BOOK A CALL' : 'BOOK AN APPOINTMENT';
  function move(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * .12);
    y.set((e.clientY - r.top - r.height / 2) * .18);
    e.currentTarget.style.setProperty('--light-x', `${(e.clientX - r.left) / r.width * 100}%`);
  }
  return <motion.a href={configured ? GOOGLE_FORM_URL : '#appointment-setup'} target={configured ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label} data-testid={id} data-cursor="ENTER" data-booking-configured={configured} className={`pill-button ${className}`} style={{ x, y }} whileHover={reduce ? {} : { scale: 1.025 }} whileTap={{ scale: .98 }} onClick={e => { if (!configured) { e.preventDefault(); toast.info('Appointments are opening soon.', { description: 'The booking link hasn’t been connected yet. Please check back shortly.', id: 'appointment-setup' }); } }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}><span>{label}</span><ArrowUpRight size={17} aria-hidden="true" /><i className="button-reflection" aria-hidden="true" /></motion.a>;
}

function CustomCursor() {
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const px = useMotionValue(-100); const py = useMotionValue(-100);
  const x = useSpring(px, { stiffness: 450, damping: 35 });
  const y = useSpring(py, { stiffness: 450, damping: 35 });
  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches); update(); query.addEventListener('change', update);
    const move = (e: PointerEvent) => { px.set(e.clientX); py.set(e.clientY); setVisible(true); setLabel((e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? ''); };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move); document.addEventListener('pointerleave', leave);
    return () => { query.removeEventListener('change', update); window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); };
  }, [px, py]);
  if (!enabled) return null;
  return <motion.div className={`custom-cursor ${label ? 'expanded' : ''}`} style={{ x, y, opacity: visible ? 1 : 0 }} aria-hidden="true">{label}</motion.div>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const [down, setDown] = useState(false);
  const pathname = usePathname();
  useEffect(() => { let previous = window.scrollY; let ticking = false; const apply = () => { setScrolled(window.scrollY > 35); setDown(window.scrollY > previous && window.scrollY > 240); previous = window.scrollY; ticking = false; }; const scroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }; apply(); window.addEventListener('scroll', scroll, { passive: true }); return () => window.removeEventListener('scroll', scroll); }, []);
  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => { const observer = new IntersectionObserver(entries => { for (const entry of entries) if(entry.isIntersecting) setActive(entry.target.id); }, { rootMargin: '-25% 0px -35% 0px' }); ['work','services','studio'].forEach(id => { const el=document.getElementById(id); if(el) observer.observe(el); }); return ()=>observer.disconnect(); }, [pathname]);
  const links = [{ name: 'Work', href: '/work/', key: 'work' }, { name: 'Services', href: '/#services', key: 'services' }, { name: 'Studio', href: '/#studio', key: 'studio' }];
  return <header data-testid="glass-navbar" className={`site-header floating-nav ${scrolled ? 'is-scrolled' : ''} ${down ? 'scrolling-down' : ''}`}>
    <Link href="/" data-testid="header-logo" className="brand-link" aria-label="Web Solutions home"><img src="/assets/brand-logo-clear.webp" alt="Web Solutions" width="166" height="48" /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.name} href={link.href} data-testid={`nav-${link.key}`} aria-current={(pathname?.startsWith('/work') && link.key==='work') || active===link.key ? 'location' : undefined} className={(pathname?.startsWith('/work') && link.key==='work') || active===link.key ? 'active' : ''}>{link.name}<span className="nav-dot" /></Link>)}</nav>
    <div className="header-right"><span className="nav-availability" aria-label="Open for possibilities" data-testid="header-availability"/><ContactLink id="header-contact" className="small nav-booking" />
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogTrigger render={<Button variant="ghost" className={`mobile-menu-trigger ${menu?'is-open':''}`} data-testid="mobile-menu-open" aria-label="Open navigation"><span /><span /></Button>} />
        <DialogContent className="mobile-menu cinematic-menu" showCloseButton={false}>
          <div className="menu-top"><DialogTitle data-testid="mobile-menu-title">Web Solutions</DialogTitle><DialogClose render={<Button variant="ghost" className="menu-close" data-testid="mobile-menu-close" aria-label="Close navigation"><Plus size={30} /></Button>} /></div>
          <nav aria-label="Mobile navigation">{links.map((link, i) => <Link href={link.href} key={link.name} data-testid={`mobile-nav-${link.key}`} onClick={() => setMenu(false)}><span>0{i + 1}</span>{link.name}<ArrowUpRight /></Link>)}</nav>
          <ContactLink id="mobile-contact" className="glass-appointment" /><p className="eyebrow" data-testid="mobile-menu-footer">INDEPENDENT THINKING. GLOBAL REACH.</p>
        </DialogContent>
      </Dialog>
    </div>
  </header>;
}

export function Footer() {
  const ref = useRef<HTMLElement>(null); const desktop = useDesktopMotion(); const [visible,setVisible]=useState(false);
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end end']});
  const backgroundColor=useTransform(scrollYProgress,[0,.55],['#141810','#c1ff46']);
  const color=useTransform(scrollYProgress,[0,.4],['#f5f5ef','#142007']);
  return <motion.footer ref={ref} id="contact" className="footer final-scene" style={desktop?{backgroundColor,color}:{}} onViewportEnter={()=>setVisible(true)} viewport={{amount:.2,once:true}}>
    <div className="footer-kicker"><span className="eyebrow" data-testid="footer-kicker"><i className="status-dot" />YOUR NEXT CHAPTER STARTS HERE</span><span className="eyebrow" data-testid="footer-location">BASED IN INDIA. BUILT FOR EVERYWHERE.</span></div>
    <div className="footer-title-row"><h2 data-testid="footer-title"><SplitText text="LET’S MAKE" ready={visible}/><br /><SplitText text="WHAT’S NEXT." ready={visible} delay={.17}/></h2></div>
    <div className="footer-middle"><p data-testid="footer-copy">Big idea. Small question. A whole new beginning.<br />We’d love to hear what’s on your mind.</p><ContactLink id="footer-start-project" className="glass-appointment" /></div>
    <div className="footer-bottom"><Link href="/" className="brand-link" data-testid="footer-logo"><img src="/assets/brand-logo.webp" width="145" height="43" alt="Web Solutions home" /></Link><span data-testid="footer-copyright">© {new Date().getFullYear()} Web Solutions</span><a href={SITE.instagram} target="_blank" rel="noopener noreferrer" data-testid="footer-instagram">Instagram <ArrowUpRight size={13} /></a><a href="#main-content" data-testid="back-to-top">Back to top <ArrowRight size={13} className="up-arrow" /></a></div>
  </motion.footer>;
}

export function Reveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  return <motion.div data-testid={id} className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  return <><a href="#main-content" className="skip-link" data-testid="skip-to-content">Skip to content</a><Navbar />{children}<Footer /><CustomCursor /><Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background:'#1b2116',border:'1px solid #c1ff4630',color:'#f5f5ef' } }} /></>;
}