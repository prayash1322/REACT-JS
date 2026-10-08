import { useState } from 'react';
import { Info, X } from 'lucide-react';
import tmdbApi from '../../services/tmdbApi';
import './DevKeyNotice.css';

export default function DevKeyNotice() {
  const [dismissed, setDismissed] = useState(false);

  if (tmdbApi.isConfigured() || dismissed) {
    return null;
  }

  return (
    <div className="dev-notice-banner" role="alert">
      <div className="container d-flex flex-wrap align-items-center justify-content-between py-2">
        <div className="d-flex align-items-center gap-2">
          <Info size={16} className="text-warning flex-shrink-0" />
          <span>
            <strong>Developer Notice:</strong> TMDb API key is not configured in <code>.env</code>.
            Running with built-in cinematic showcase data. Add <code>VITE_TMDB_API_KEY</code> for live queries.
          </span>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-link text-white p-0 d-flex align-items-center"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notice"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
