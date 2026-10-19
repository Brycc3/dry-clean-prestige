import { useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { priceItems, calculateEstimate, priceRange, money } from '@/lib/business';

export function EstimateCalculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cod, setCod] = useState(false);
  const estimate = calculateEstimate(quantities, cod);
  const update = (id: string, value: number) => setQuantities(previous => ({ ...previous, [id]: Number.isFinite(value) ? Math.max(0, Math.min(99, Math.floor(value))) : 0 }));
  return <section className="calculator" aria-labelledby="calculator-heading">
    <div className="flex items-center justify-between mb-3"><p className="eyebrow">Estimate calculator</p><Button variant="quantity" size="icon" title="Reset estimate" aria-label="Reset estimate" onClick={() => { setQuantities({}); setCod(false); }}><RotateCcw size={15}/></Button></div>
    <h2 id="calculator-heading">Add up your pieces</h2><p className="text-[15px] text-paper-muted leading-6 mt-3 mb-5">Choose your pieces. All amounts are in USD.</p>
    {priceItems.map(item => <div className="calculator-row" key={item.id}><label htmlFor={`quantity-${item.id}`}>{item.name}<small>{priceRange(item.min, item.max)}{item.id === 'regular' ? ' · REG ONLY' : ''}</small></label><div className="quantity-control"><Button variant="quantity" aria-label={`Remove ${item.name}`} disabled={!quantities[item.id]} onClick={() => update(item.id, (quantities[item.id] ?? 0) - 1)}><Minus size={12}/></Button><input id={`quantity-${item.id}`} className="quantity-input" type="number" min="0" max="99" step="1" value={quantities[item.id] ?? 0} onChange={event => update(item.id, Number(event.target.value))} aria-label={`${item.name} quantity`}/><Button variant="quantity" aria-label={`Add ${item.name}`} disabled={(quantities[item.id] ?? 0) >= 99} onClick={() => update(item.id, (quantities[item.id] ?? 0) + 1)}><Plus size={12}/></Button></div></div>)}
    <label className="cod-option"><input type="checkbox" checked={cod} onChange={event => setCod(event.target.checked)}/><span>Pay on collection (COD)<span className="block text-[13px] text-paper-muted">Adds $0.25 per piece. Listed prices are prepaid.</span></span></label>
    <div aria-live="polite" aria-atomic="true"><div className="estimate-lines"><div className="estimate-line"><span>Cleaning · {estimate.pieces} {estimate.pieces === 1 ? 'piece' : 'pieces'}</span><span>{priceRange(estimate.min, estimate.max)}</span></div><div className="estimate-line"><span>Environmental safety fee · 9%</span><span>{priceRange(estimate.feeMin, estimate.feeMax)}</span></div>{cod && <div className="estimate-line"><span>COD surcharge · $0.25 / piece</span><span>{money(estimate.codFee)}</span></div>}</div><div className="estimate-total"><span className="eyebrow">Estimated total</span><strong>{priceRange(estimate.totalMin, estimate.totalMax)}</strong></div></div>
    <p className="text-[13px] leading-[1.6] text-paper-muted mt-5"><strong>ESTIMATE ONLY.</strong> Prices and final charges require in-store confirmation. Tablecloths produce a price range. The 9% fee is estimated on cleaning charges before the separate COD surcharge; final invoice calculation may vary. Suede, leather, gowns, bedding, alterations and other quoted items are not included.</p>
  </section>;
}