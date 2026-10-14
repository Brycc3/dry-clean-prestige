import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Shirt, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DirectionsButton, VisitBand } from '@/components/site-shell';
import { EditorialMedia } from '@/components/editorial-media';
import { ServiceList } from '@/components/service-list';
import { business, pageHead } from '@/lib/business';
import hero from '@/assets/garment-editorial.jpg';
import linen from '@/assets/linen-editorial.jpg';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({ ...pageHead('Garment care in Houston', 'Dry Clean Super Center at 12525 Kuykendahl Rd, Houston. Explore sign-based cleaning prices, services and directions. Independent website concept.', '/'), scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DryCleaningOrLaundry', name: business.name, address: { '@type': 'PostalAddress', streetAddress: business.address, addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77090', addressCountry: 'US' }, hasMap: business.directions, description: 'Dry cleaning and laundry business in Houston. This page is an independent website concept, not affiliated with or approved by the business.' }) }] }),
});

function Index() {
  return <>
    <section className="hero grain">
      <EditorialMedia image={hero} alt="Editorial still life of an ivory blouse and tailored jacket on wooden hangers" hero/>
      <div className="site-width hero-content reveal"><p className="eyebrow text-primary flex items-center gap-3"><span className="w-7 h-px bg-primary"/>Garment care · Houston, Texas</p>
      <h1>Dry Clean<br/>Super Center<span className="block"><em>A fresh perspective.</em></span></h1>
      <p className="hero-description">The pieces you wear. The linens you live with.<br/>Everyday garment care, right here on Kuykendahl.</p>
      <div className="flex flex-wrap gap-3 mt-8 reveal reveal-delay"><Button variant="gold" asChild><Link to="/services">Explore our services <ArrowUpRight/></Link></Button><Button variant="editorial" asChild><Link to="/pricing">View pricing <ArrowRight/></Link></Button></div></div>
      <div className="site-width hero-bottom"><a href="#care" className="hero-scroll">Care, in every detail <ArrowDown size={16} className="text-primary"/></a><span className="hero-caption">Independent concept · Editorial imagery</span></div>
    </section>
    <div className="info-strip"><div className="site-width info-strip-inner"><a className="info-item" href={business.directions} target="_blank" rel="noopener noreferrer"><MapPin size={19} className="text-primary"/><span>12525 Kuykendahl Rd <span className="text-muted-foreground">· Houston</span></span></a><div className="info-item"><Shirt size={19} className="text-primary"/><span>Regular dry cleaning <span className="text-primary">$3.49*</span></span></div><div className="info-item"><Sparkles size={19} className="text-primary"/><span>Cotton shirt laundry <span className="text-primary">$2.89*</span></span></div></div></div>
    <section id="care" className="section paper-section"><div className="site-width"><div className="section-top"><div><p className="eyebrow text-paper-muted mb-4">From wardrobe to home</p><h2 className="section-heading">Good care. Beautifully simple.</h2></div><Button variant="ink" asChild><Link to="/services">All services <ArrowUpRight/></Link></Button></div><ServiceList limit={3}/><p className="text-[10px] text-paper-muted mt-5">Also available: tablecloths, alterations & leather cleaning.</p></div></section>
    <section className="section"><div className="site-width editorial-layout"><div className="relative"><img src={linen} width={1280} height={1024} loading="lazy" alt="Editorial arrangement of freshly folded cotton linens" className="editorial-image"/><p className="hero-caption mt-3">An editorial study in everyday essentials.</p></div><div><p className="eyebrow text-primary mb-5">Everyday essentials. Clear pricing.</p><h2 className="section-heading">A fresh start,<br/>without the guesswork.</h2><p className="section-copy mt-6">Plan your next visit with prices from the business sign. From your weekly shirts to the linens on your table, know where your estimate begins.</p><div className="price-teaser"><div><p className="text-[11px] mb-2">Regular dry cleaning</p><p className="price-number">$3.49<span className="font-sans text-[10px] text-muted-foreground"> / piece</span></p></div><div><p className="text-[11px] mb-2">Cotton button down shirts</p><p className="price-number">$2.89<span className="font-sans text-[10px] text-muted-foreground"> / piece</span></p></div></div><p className="fine-print mt-4">*Prepaid prices. Regular dry cleaning: REG ONLY, excluding suede, leather and gowns. A 9% environmental safety fee applies to each cleaning invoice. COD adds $0.25 per piece. Prices subject to in-store confirmation.</p><Button variant="editorial" asChild className="mt-7"><Link to="/pricing">Calculate your estimate <ArrowUpRight/></Link></Button></div></div></section>
    <VisitBand/>
  </>;
}
