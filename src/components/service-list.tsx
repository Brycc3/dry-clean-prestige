import { Reveal } from '@/components/effects';
import { Shirt, WashingMachine, BedDouble, Scissors, Layers, Sparkles } from 'lucide-react';

export const services = [
  { name: 'Dry cleaning', icon: Shirt, description: 'For the pieces in your everyday wardrobe. Regular garment pricing is listed on the in-store sign.' },
  { name: 'Laundry', icon: WashingMachine, description: 'Cotton button down shirts and everyday essentials. Explore the sign-based price list before your visit.' },
  { name: 'Bedding', icon: BedDouble, description: 'Bring in your bedding and ask for an item-specific cleaning quote in store.' },
  { name: 'Tablecloths', icon: Layers, description: 'For the linens that bring a table together. Listed at $10.00–$12.50, subject to confirmation.' },
  { name: 'Alterations', icon: Scissors, description: 'Alterations are available according to the business sign. Discuss your garment and requirements in store.' },
  { name: 'Leather cleaning', icon: Sparkles, description: 'Available according to the business sign. Leather and suede are excluded from regular dry cleaning pricing.' },
];
export function ServiceList({ limit }: { limit?: number }) {
  return <div className="service-grid">{services.slice(0, limit).map((service, i) => <Reveal key={service.name} index={i}><article className="service-item"><div className="flex items-center justify-between"><service.icon className="service-icon"/></div><h3>{service.name}</h3><p>{service.description}</p></article></Reveal>)}</div>;
}