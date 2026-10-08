import './Skeletons.css';

export default function HeroSkeleton() {
  return (
    <div className="hero-skeleton-wrapper">
      <div className="container-fluid px-3 px-md-5 w-100">
        <div style={{ maxWidth: '650px' }}>
          <div className="skeleton-block mb-3" style={{ width: '120px', height: '24px' }}></div>
          <div className="skeleton-block mb-4" style={{ width: '80%', height: '56px' }}></div>
          <div className="skeleton-block mb-3" style={{ width: '40%', height: '20px' }}></div>
          <div className="skeleton-block mb-4" style={{ width: '90%', height: '70px' }}></div>
          <div className="d-flex gap-3">
            <div className="skeleton-block" style={{ width: '140px', height: '44px' }}></div>
            <div className="skeleton-block" style={{ width: '140px', height: '44px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
