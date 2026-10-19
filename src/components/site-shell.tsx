import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/brand';
import { business } from '@/lib/business';

const navigation = [{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }, { to: '/pricing', label: 'Pricing' }, { to: '/about', label: 'About' }, { to: '/visit', label: 'Visit Us' }] as const;

export function DirectionsButton({ variant = 'gold' }: { variant?: 'gold' | 'editorial' | 'ink' }) {
  return <Button variant={variant} asChild><a href={business.directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16}/></a></Button>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-primary focus:text-primary-foreground focus:p-3">Skip to content</a>
    <header className="site-header"><div className="site-width flex items-center justify-between gap-6">
      <Brand/>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className="nav-link">{item.label}</Link>)}</nav>
      <div className="header-directions"><DirectionsButton variant="editorial"/></div>
      <div className="mobile-nav"><Button variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>
    </div>{open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">{navigation.map(item => <Link key={item.to} to={item.to} activeOptions={{ exact: true }} className="nav-link">{item.label}</Link>)}</nav>}</header>
    <main id="main">{children}</main>
    <footer className="footer"><div className="site-width"><div className="footer-top"><Brand/><nav className="footer-nav" aria-label="Footer navigation">{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav><a href={business.directions} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[15px] leading-6 text-muted-foreground hover:text-primary"><MapPin size={17} className="text-primary mt-1"/><span>{business.address}<br/>{business.city}</span></a></div>
    <div className="footer-bottom"><p>Independent website concept, not affiliated with or approved by the business</p><p>Photos and video show the actual store. No official logo file supplied; wordmark is based on the storefront sign.</p></div></div></footer>
  </>;
}

export function VisitBand() {
  return <section className="visit-band"><div className="site-width visit-inner"><div><p className="eyebrow mb-2">Your neighborhood dry cleaner</p><h2 className="section-heading">Come by the store on Kuykendahl.</h2><p className="mt-2 text-[17px]">{business.address} · {business.city}</p></div><DirectionsButton/></div></section>;
}