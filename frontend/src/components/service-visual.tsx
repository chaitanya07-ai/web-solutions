"use client";
import { ArrowUpRight, AudioLines, Code2, Cpu, Layers3, ScanLine, ShieldCheck, Workflow, BarChart3, Check, ShoppingBag } from "lucide-react";
import type { Service } from "@/lib/site";

const icons = { web: Code2, menu: ScanLine, ai: Cpu, automation: Workflow, data: BarChart3, commerce: ShoppingBag, care: ShieldCheck };
export function GlassIcon({ type, small = false }: { type: Service['visual']; small?: boolean }) {
  const Icon = icons[type];
  return <div className={`glass-icon ${small ? 'small' : ''}`} aria-hidden="true"><div className="icon-back" /><div className="icon-face"><Icon strokeWidth={1.2} /></div></div>;
}
export function ServiceVisual({ type }: { type: Service['visual'] }) {
  return <div className={`service-visual visual-${type}`} aria-hidden="true"><div className="visual-grid" /><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><GlassIcon type={type} />
    <div className="floating-panel panel-top"><span className="tiny-dot" />{type === 'ai' ? 'Intelligence, made human.' : type === 'automation' ? 'Everything, connected.' : type === 'commerce' ? 'Designed for the next step.' : type === 'data' ? 'From data to direction.' : type === 'menu' ? 'Scan. Discover. Enjoy.' : type === 'care' ? 'Always moving forward.' : 'Thoughtfully engineered.'}<ArrowUpRight size={12} /></div>
    {type === 'web' ? <div className="mini-browser"><div className="browser-chrome"><i /><i /><i /><span>your next chapter</span></div><div className="browser-content"><span>Good design.<br /><em>Great possibilities.</em></span><div className="browser-lines"><i /><i /></div><div className="browser-cta" /></div></div>
    : type === 'ai' || type === 'automation' ? <div className="node-system"><svg className="node-connections" viewBox="0 0 300 90"><path d={type === 'ai' ? 'M25 45 Q90 -10 150 45 T275 45' : 'M25 45 H95 V20 H200 V45 H275'} /><path className="node-signal" d={type === 'ai' ? 'M25 45 Q90 -10 150 45 T275 45' : 'M25 45 H95 V20 H200 V45 H275'} /></svg><span className="node"><AudioLines size={21} /></span><span className="node"><Workflow size={21} /></span><span className="node"><Check size={21} /></span></div>
    : type === 'data' ? <div className="chart-visual">{[28, 45, 35, 60, 49, 73, 90, 78, 100].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * .08}s` }} />)}</div>
    : type === 'commerce' ? <div className="commerce-object"><div className="commerce-product"><ShoppingBag strokeWidth={1}/></div><span>YOUR NEXT FAVOURITE.</span><div className="commerce-check"><Check size={12}/> ADDED TO BAG</div></div>
    : type === 'menu' ? <div className="menu-object"><div className="qr-motif"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><span>SCAN TO DISCOVER</span><div className="qr-scan"/></div>
    : <div className="visual-layers"><span /><span /><span /><Layers3 /></div>}
    <div className="floating-panel panel-bottom"><span className="visual-pulse" /><span>DESIGN MEETS FUNCTION</span><span className="mini-cross">+</span></div><div className="visual-corner corner-tl" /><div className="visual-corner corner-br" />
  </div>;
}