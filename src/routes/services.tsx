import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { pageHead } from '@/lib/business';
import { Button } from '@/components/ui/button';
import { ServiceList } from '@/components/service-list';
import { VisitBand } from '@/components/site-shell';

export const Route = createFileRoute('/services')({ component: Services, head: () => pageHead('Cleaning & alterations services', 'Explore dry cleaning, laundry, bedding, tablecloths, alterations and leather cleaning at Dry Clean Super Center. Independent concept; confirm details in store.', '/services') });
function Services() {
  return <><section className="page-intro"><div className="site-width reveal"><p className="eyebrow text-primary">Wardrobe & home</p><h1>A place for every piece.</h1><p className="section-copy max-w-xl">Dry cleaning, laundry and more, on Kuykendahl Road. The services below are listed on the business sign; item eligibility and specific care requirements should be confirmed in store.</p></div></section><section className="section paper-section"><div className="site-width"><ServiceList/><div className="section-top mt-12 mb-0"><p className="section-copy max-w-md">Some pieces need an individual quote. Bring bedding, leather, suede, gowns and alteration requests to the store for confirmation.</p><Button variant="ink" asChild><Link to="/pricing">Explore the price list <ArrowUpRight/></Link></Button></div></div></section><VisitBand/></>;
}