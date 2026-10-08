import { Link } from 'react-router-dom';
import { Film, Search, Heart, Bookmark, Compass } from 'lucide-react';
import './EmptyState.css';

const ICON_MAP = {
  film: Film,
  search: Search,
  heart: Heart,
  bookmark: Bookmark,
  compass: Compass,
  'bi-collection': Film,
  'bi-search': Search,
  'bi-heart': Heart,
  'bi-bookmark': Bookmark,
  'bi-funnel': Compass
};

export default function EmptyState({
  icon = 'film',
  title = 'No movies found',
  description = 'Try exploring other categories or adjusting your filters.',
  actionText = 'Browse Movies',
  actionLink = '/movies',
  onActionClick
}) {
  const IconComponent = ICON_MAP[icon] || Film;

  return (
    <div className="card text-center py-5 px-3 my-5 mx-auto rounded-1 border" style={{ maxWidth: '480px', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <div
        className="rounded-circle border d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'var(--border)' }}
      >
        <IconComponent size={28} className="text-secondary opacity-75" />
      </div>
      <h3 className="fs-5 fw-bold text-white mb-2">{title}</h3>
      <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: '360px' }}>{description}</p>
      <div className="d-flex justify-content-center">
        {onActionClick ? (
          <button type="button" className="btn btn-cine-primary" onClick={onActionClick}>
            {actionText}
          </button>
        ) : actionLink ? (
          <Link to={actionLink} className="btn btn-cine-primary">
            {actionText}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
