import { Link } from '@tanstack/react-router';

export function Brand() {
  return <Link to="/" className="brand" aria-label="Dry Clean Super Center home">
    <svg className="brand-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M21 16a4 4 0 1 1 6 3.5L24 22v4L7 35a2 2 0 0 0 1 4h32a2 2 0 0 0 1-4l-17-9" stroke="currentColor" strokeWidth="1.3"/><path d="M5 9h38M5 45h38" stroke="currentColor" strokeWidth=".6"/></svg>
    <div><div className="brand-name">Dry Clean<br/>Super Center</div><div className="brand-caption">Houston, Texas</div></div>
  </Link>;
}