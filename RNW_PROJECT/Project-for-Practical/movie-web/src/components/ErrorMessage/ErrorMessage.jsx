import { AlertTriangle, RotateCcw } from 'lucide-react';
import './ErrorMessage.css';

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'We encountered an error while loading movies. Please try again.',
  onRetry
}) {
  return (
    <div
      className="card text-center p-4 my-4 mx-auto rounded-1 border"
      style={{ maxWidth: '480px', backgroundColor: 'var(--bg-card)', borderColor: 'rgba(229, 9, 20, 0.35)' }}
    >
      <div
        className="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{ width: '52px', height: '52px', backgroundColor: 'rgba(229, 9, 20, 0.15)', color: 'var(--accent)' }}
      >
        <AlertTriangle size={24} />
      </div>
      <h3 className="fs-5 fw-bold text-white mb-2">{title}</h3>
      <p className="text-secondary small mb-3 mx-auto" style={{ maxWidth: '360px' }}>{message}</p>
      {onRetry && (
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-sm btn-cine-primary d-inline-flex align-items-center gap-1" onClick={onRetry}>
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      )}
    </div>
  );
}
