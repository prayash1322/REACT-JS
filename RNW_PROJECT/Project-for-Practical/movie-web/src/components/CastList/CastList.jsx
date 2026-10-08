import { useState } from 'react';
import { User } from 'lucide-react';
import { getProfileUrl } from '../../utils/imageHelpers';
import './CastList.css';

function CastCardItem({ person }) {
  const [imgError, setImgError] = useState(false);
  const profileUrl = getProfileUrl(person.profile_path, 'w185');

  return (
    <div
      className="card border rounded overflow-hidden flex-shrink-0 cast-card-item"
      style={{ width: '135px', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
    >
      <div className="w-100 overflow-hidden d-flex align-items-center justify-content-center" style={{ aspectRatio: '1 / 1.25', backgroundColor: '#11151e' }}>
        {profileUrl && !imgError ? (
          <img
            src={profileUrl}
            alt={person.name}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <User size={32} strokeWidth={1.6} className="text-secondary opacity-50" />
        )}
      </div>
      <div className="card-body p-2 overflow-hidden">
        <h4 className="fs-6 fw-semibold text-white m-0 text-truncate" title={person.name}>{person.name}</h4>
        <small className="text-secondary text-truncate d-block mt-1" title={person.character}>
          {person.character || 'Role'}
        </small>
      </div>
    </div>
  );
}

export default function CastList({ cast = [] }) {
  if (!cast || cast.length === 0) {
    return (
      <div className="text-secondary small py-2">Cast information currently unavailable.</div>
    );
  }

  const displayedCast = cast.slice(0, 12);

  return (
    <div className="d-flex gap-3 overflow-auto hide-scrollbar pb-2">
      {displayedCast.map((person) => (
        <CastCardItem key={person.id} person={person} />
      ))}
    </div>
  );
}
