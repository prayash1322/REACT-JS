import Button from '../ui/Button'

function CheckInTime() {
  return (
    <section className="section check-in-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <div className="check-in-section__content">
              <p className="script-title">Check-in Time</p>
              <div className="info-block"><span className="info-block__icon">◷</span><div><h3>From 8 AM to 10 PM</h3><p>Arrive when it suits your family. We are here to make drop-off calm and easy.</p></div></div>
              <div className="info-block"><span className="info-block__icon">★</span><div><h3>Favourite toys welcome</h3><p>Bring a little reminder of home so your companion can settle in comfortably.</p></div></div>
              <Button href="tel:+1234567890" variant="outline">Call +1 234 555 0187</Button>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="check-in-photo">
              <img src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=850&q=85" alt="Woman holding a small dog" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckInTime
