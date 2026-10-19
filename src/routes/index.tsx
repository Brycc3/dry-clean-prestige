import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, MapPin, Shirt, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DirectionsButton, VisitBand } from '@/components/site-shell';
import { EditorialMedia } from '@/components/editorial-media';
import { GarmentConveyor, SteamPress, StainSlider } from '@/components/effects';
import { ServiceList } from '@/components/service-list';
import { business, pageHead } from '@/lib/business';
import storefront from '@/assets/storefront.mp4.asset.json';
import storefrontPoster from '@/assets/storefront-real.jpg.asset.json';
import interior from '@/assets/interior.mp4.asset.json';
import counterPoster from '@/assets/counter-real.jpg.asset.json';
import priceSign from '@/assets/price-sign.jpg.asset.json';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({ ...pageHead('Neighborhood dry cleaner in Houston', 'Dry Clean Super Center at 12525 Kuykendahl Rd, Houston. See the store, the posted prices, services and directions. Independent website concept.', '/'), scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'DryCleaningOrLaundry', name: business.name, address: { '@type': 'PostalAddress', streetAddress: business.address, addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77090', addressCountry: 'US' }, hasMap: business.directions, description: 'Dry cleaning and laundry business in Houston. This page is an independent website concept, not affiliated with or approved by the business.' }) }] }),
});

function Index() {
  return <>
    <section className="hero"><div className="site-width hero-grid">
      <div className="reveal"><p className="eyebrow text-primary">12525 Kuykendahl Rd · Houston, TX</p>
        <h1>Your neighborhood dry cleaner on Kuykendahl.</h1>
        <p className="hero-description">Dry cleaning, laundry, alterations and leather cleaning. Prices are posted in the store — regular garments from $3.49, cotton shirts $2.89.</p>
        <div className="flex flex-wrap gap-3 mt-7"><DirectionsButton/><Button variant="editorial" asChild><Link to="/pricing">See prices & estimate <ArrowRight/></Link></Button></div>
      </div>
      <figure className="reveal reveal-delay"><div className="portrait-media"><EditorialMedia image={storefrontPoster.url} videoSrc={storefront.url} alt="Video of the Dry Clean Super Center storefront with its blue awning and glass doors" hero/></div><figcaption className="media-caption">The storefront at 12525 Kuykendahl Rd · real footage</figcaption></figure>
    </div></section>
    <GarmentConveyor/>
    <div className="info-strip"><div className="site-width info-strip-inner"><a className="info-item hover:text-primary" href={business.directions} target="_blank" rel="noopener noreferrer"><MapPin size={20} className="text-primary"/>12525 Kuykendahl Rd, Houston</a><div className="info-item"><Shirt size={20} className="text-primary"/>Regular dry cleaning $3.49*</div><div className="info-item"><Receipt size={20} className="text-primary"/>Cotton shirt laundry $2.89*</div></div></div>
    <section className="section"><div className="site-width editorial-layout">
      <figure><div className="portrait-media"><EditorialMedia image={counterPoster.url} videoSrc={interior.url} alt="Walkthrough video inside the Dry Clean Super Center lobby and front counter"/></div><figcaption className="media-caption">Inside the store · lobby and front counter</figcaption></figure>
      <div><p className="eyebrow text-primary mb-3">Step inside</p><h2 className="section-heading">A simple, friendly counter.</h2><p className="section-copy mt-4">Walk in, hand your clothes over the counter and pick them up when they're ready. The full price list hangs on the wall so you know what to expect.</p><Button variant="editorial" asChild className="mt-6"><Link to="/about">About the store <ArrowRight/></Link></Button></div>
    </div></section>
    <section className="section paper-section"><div className="site-width"><div className="section-top"><div><p className="eyebrow text-primary mb-2">What we clean</p><h2 className="section-heading">Services listed on the sign.</h2></div><Button variant="ink" asChild><Link to="/services">All services <ArrowRight/></Link></Button></div><ServiceList limit={3}/><p className="fine-print mt-4">Also available: tablecloths, alterations and leather cleaning.</p><div className="effects-row"><SteamPress/><div><p className="eyebrow text-primary mb-2">Drag to compare</p><h3 className="section-heading text-[28px]">Spots out, crisp press in.</h3><div className="mt-5"><StainSlider/></div></div></div></div></section>
    <section className="section"><div className="site-width editorial-layout">
      <figure><div className="photo-frame"><img src={priceSign.url} width={900} height={1200} loading="lazy" alt="Photo of the price sign on the store wall" className="editorial-image"/></div><figcaption className="media-caption">The price sign inside the store</figcaption></figure>
      <div><p className="eyebrow text-primary mb-3">Straightforward pricing</p><h2 className="section-heading">Know the price before you go.</h2><p className="section-copy mt-4">These prices are copied from the sign on the wall. Use the calculator to add up your pieces.</p><div className="price-teaser"><div><p className="text-sm mb-1">Regular dry cleaning</p><p className="price-number">$3.49<span className="font-sans text-sm font-normal text-muted-foreground"> / piece</span></p></div><div><p className="text-sm mb-1">Cotton button down shirts</p><p className="price-number">$2.89<span className="font-sans text-sm font-normal text-muted-foreground"> / piece</span></p></div></div><p className="fine-print mt-4">*Prepaid prices. Regular dry cleaning is REG ONLY and excludes suede, leather and gowns. A 9% environmental safety fee applies to each cleaning invoice. COD adds $0.25 per piece. Please confirm prices in store.</p><Button variant="gold" asChild className="mt-6"><Link to="/pricing">Estimate your total <ArrowRight/></Link></Button></div>
    </div></section>
    <VisitBand/>
  </>;
}
