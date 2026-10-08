import { Link } from 'react-router-dom';
import { Film, Globe, Tv } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cine-footer mt-auto">
      <div className="container">
        <div className="row gy-4 mb-4">
          <div className="col-12 col-md-5">
            <Link to="/" className="cine-brand d-inline-flex align-items-center gap-2 mb-3">
              <span className="brand-icon">
                <Film size={18} strokeWidth={2.2} />
              </span>
              <span className="brand-text">
                CINE<span className="brand-accent">VAULT</span>
              </span>
            </Link>
            <p className="cine-footer-desc text-secondary">
              A modern cinema discovery platform. Explore trending releases, curated recommendations,
              cast details, and maintain your personal watchlist in one cinematic space.
            </p>
            <div className="d-flex align-items-center gap-3 cine-social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon-btn">
                <Globe size={16} />
              </a>
              <a href="https://themoviedb.org" target="_blank" rel="noreferrer" aria-label="The Movie Database" className="social-icon-btn">
                <Tv size={16} />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-3 offset-md-1">
            <h6 className="footer-column-title">Explore</h6>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies Catalog</Link></li>
              <li><Link to="/search">Search Database</Link></li>
              <li><Link to="/movies?genre=28">Action Cinema</Link></li>
              <li><Link to="/movies?genre=878">Sci-Fi Universe</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="footer-column-title">Account & Library</h6>
            <ul className="footer-links-list">
              <li><Link to="/favorites">Favorite Movies</Link></li>
              <li><Link to="/watchlist">Watchlist</Link></li>
              <li><Link to="/profile">Profile Settings</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="m-0 text-secondary small">
            &copy; {currentYear} CINEVAULT. Cinematic discovery for movie lovers.
          </p>
          <div className="d-flex align-items-center gap-4 text-secondary small">
            <span>Powered by TMDb API</span>
            <span className="text-secondary opacity-50">&bull;</span>
            <Link to="/movies" className="text-secondary hover-text-white">Discover</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
