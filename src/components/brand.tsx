import { Link } from '@tanstack/react-router';

// Text wordmark modeled on the storefront sign (white "DRY CLEAN", red "SUPER CENTER" panel, hanger roundel).
// No clean logo file was found in the uploaded footage; replace with the official logo once supplied.
export function Brand() {
  return <Link to="/" className="brand" aria-label="Dry Clean Super Center home">
    <span className="brand-hanger" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1 1-1.1 1.8v1L4.5 21.5a1.2 1.2 0 0 0 .6 2.2h21.8a1.2 1.2 0 0 0 .6-2.2L16 14.5"/></svg></span>
    <span><span className="brand-name block">Dry Clean</span><span className="brand-badge">Super Center</span></span>
  </Link>;
}
