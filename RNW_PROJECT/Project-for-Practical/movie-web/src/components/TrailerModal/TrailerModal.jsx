import { useEffect } from 'react';
import { Play, X, VideoOff } from 'lucide-react';
import './TrailerModal.css';

export default function TrailerModal({ isOpen, trailerKey, movieTitle, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="trailer-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Movie Trailer">
      <div className="trailer-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="trailer-modal-header d-flex align-items-center justify-content-between p-3">
          <h4 className="trailer-modal-title m-0 text-truncate d-flex align-items-center gap-2">
            <Play size={18} className="text-danger" fill="#E50914" />
            {movieTitle ? `${movieTitle} (Trailer)` : 'Official Trailer'}
          </h4>
          <button
            type="button"
            className="trailer-close-btn"
            onClick={onClose}
            aria-label="Close trailer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="trailer-modal-body">
          {trailerKey ? (
            <div className="trailer-iframe-box">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
                title={`${movieTitle} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="p-5 text-center text-secondary">
              <VideoOff size={42} className="d-block mx-auto mb-3 opacity-50" />
              <p className="m-0">No official trailer video found for this title.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
