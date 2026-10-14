export const business = {
  name: 'Dry Clean Super Center',
  address: '12525 Kuykendahl Rd',
  city: 'Houston, TX 77090',
  directions: 'https://maps.apple/p/tqPG-CG~A.fyB5',
};

export const priceItems = [
  { id: 'regular', name: 'Regular dry cleaning', detail: 'REG ONLY · excludes suede, leather & gowns', min: 349, max: 349 },
  { id: 'shirts', name: 'Cotton button down shirts', detail: 'Laundry', min: 289, max: 289 },
  { id: 'pants', name: 'Jeans, pants & skirts', detail: '', min: 389, max: 389 },
  { id: 'shorts', name: 'Shorts', detail: '', min: 379, max: 379 },
  { id: 'pullovers', name: 'Pullovers', detail: '', min: 350, max: 350 },
  { id: 'dresses', name: 'Dresses', detail: '', min: 400, max: 400 },
  { id: 'tablecloths', name: 'Tablecloths', detail: 'Price confirmed in store', min: 1000, max: 1250 },
] as const;

export function money(cents: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100); }
export function priceRange(min: number, max: number) { return min === max ? money(min) : `${money(min)}–${money(max)}`; }
export function calculateEstimate(quantities: Record<string, number>, cod: boolean) {
  let min = 0; let max = 0; let pieces = 0;
  for (const item of priceItems) {
    const raw = quantities[item.id] ?? 0;
    const quantity = Number.isFinite(raw) ? Math.min(99, Math.max(0, Math.floor(raw))) : 0;
    pieces += quantity; min += quantity * item.min; max += quantity * item.max;
  }
  const feeMin = Math.round(min * .09); const feeMax = Math.round(max * .09);
  const codFee = cod ? pieces * 25 : 0;
  return { pieces, min, max, feeMin, feeMax, codFee, totalMin: min + feeMin + codFee, totalMax: max + feeMax + codFee };
}

export function pageHead(title: string, description: string, path: string) {
  return { meta: [
    { title: `${title} — Dry Clean Super Center` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — Dry Clean Super Center` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: path },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: path }] };
}