import './Skeletons.css';

export default function MovieDetailsSkeleton() {
  return (
    <div className="details-skeleton-hero">
      <div className="container-fluid px-3 px-md-5 w-100">
        <div className="row align-items-end gy-4">
          <div className="col-12 col-md-4 col-lg-3 d-none d-md-block">
            <div className="skeleton-block" style={{ aspectRatio: '2/3', width: '100%' }}></div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <div className="skeleton-block mb-3" style={{ width: '60%', height: '48px' }}></div>
            <div className="skeleton-block mb-3" style={{ width: '35%', height: '20px' }}></div>
            <div className="skeleton-block mb-4" style={{ width: '85%', height: '80px' }}></div>
            <div className="d-flex gap-3">
              <div className="skeleton-block" style={{ width: '140px', height: '44px' }}></div>
              <div className="skeleton-block" style={{ width: '140px', height: '44px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
