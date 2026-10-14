import { describe, expect, it } from 'vitest';
import { calculateEstimate } from '@/lib/business';

describe('Sign-based cleaning estimate', () => {
  it('starts at zero', () => { expect(calculateEstimate({}, false).totalMin).toBe(0); });
  it('adds the nine percent fee with cent rounding', () => {
    const result = calculateEstimate({ regular: 2, shirts: 3 }, false);
    expect(result.min).toBe(1565); expect(result.feeMin).toBe(141); expect(result.totalMin).toBe(1706);
  });
  it('adds twenty-five cents per piece for COD', () => {
    const result = calculateEstimate({ regular: 2, shirts: 3 }, true);
    expect(result.codFee).toBe(125); expect(result.totalMin).toBe(1831);
  });
  it('preserves the tablecloth range including fees', () => {
    const result = calculateEstimate({ tablecloths: 1 }, true);
    expect(result.totalMin).toBe(1115); expect(result.totalMax).toBe(1388);
  });
  it('sanitizes quantities', () => {
    expect(calculateEstimate({ regular: -3, shirts: NaN, shorts: 1.8 }, false).pieces).toBe(1);
    expect(calculateEstimate({ regular: 1000 }, false).pieces).toBe(99);
  });
});