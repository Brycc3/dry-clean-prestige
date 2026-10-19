import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { pageHead } from '@/lib/business';
import { Button } from '@/components/ui/button';
import { VisitBand } from '@/components/site-shell';
import { EditorialMedia } from '@/components/editorial-media';
import interior from '@/assets/interior.mp4.asset.json';
import interiorPoster from '@/assets/counter-real.jpg.asset.json';

export const Route = createFileRoute('/about')({ component: About, head: () => pageHead('About the business & this concept', 'Dry Clean Super Center is a local business on Kuykendahl Road in Houston. Learn about this independent website concept and its sign-based information.', '/about') });
function About() {
  return <><section className="page-intro"><div className="site-width reveal"><p className="eyebrow text-primary">A Houston neighborhood business</p><h1>A real local shop, close to home.</h1><p className="section-copy max-w-xl">Dry Clean Super Center is an existing local business at 12525 Kuykendahl Rd, Houston, TX 77090.</p></div></section><section className="section"><div className="site-width editorial-layout"><div><div className="relative portrait-media"><EditorialMedia image={interiorPoster.url} videoSrc={interior.url} alt="Inside the Dry Clean Super Center lobby"/></div><p className="hero-caption mt-3">Inside the store · 12525 Kuykendahl Rd</p></div><div><p className="eyebrow text-primary mb-5">An independent perspective</p><h2 className="section-heading">About this website</h2><p className="section-copy mt-6">This website is an unsolicited design concept. It is not the official website of Dry Clean Super Center and is not affiliated with or approved by the business.</p><p className="section-copy mt-5">The services and prices shown here are based on information supplied from the business sign. All photos and videos on this site show the actual store and its price sign. Please confirm pricing, service details and availability directly in store.</p><Button variant="editorial" asChild className="mt-8"><Link to="/visit">Find the business <ArrowUpRight/></Link></Button></div></div></section><VisitBand/></>;
}