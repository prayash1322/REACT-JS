import { Link } from 'react-router-dom';
import { Film, Home, Compass } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page-container d-flex align-items-center justify-content-center text-center px-3">
      <div className="notfound-card p-4 p-md-5">
        <div className="notfound-icon mb-3 d-inline-flex align-items-center justify-content-center">
          <Film size={44} className="text-danger" strokeWidth={1.8} />
        </div>
        <span className="notfound-code">404</span>
        <h1 className="notfound-title mb-2">Lost in the movie universe?</h1>
        <p className="text-secondary notfound-desc mb-4 mx-auto">
          The scene or page you are looking for has been cut from the final reel or does not exist.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn-cine-primary d-inline-flex align-items-center gap-2">
            <Home size={16} /> Back to Home
          </Link>
          <Link to="/movies" className="btn-cine-secondary d-inline-flex align-items-center gap-2">
            <Compass size={16} /> Explore Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
