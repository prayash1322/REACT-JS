import './Skeletons.css';

export default function MovieCardSkeleton() {
  return (
    <div className="card-skeleton-box">
      <div className="skeleton-block card-skeleton-poster"></div>
      <div className="card-skeleton-info">
        <div className="skeleton-block" style={{ height: '16px', width: '80%' }}></div>
        <div className="skeleton-block" style={{ height: '12px', width: '45%' }}></div>
      </div>
    </div>
  );
}
