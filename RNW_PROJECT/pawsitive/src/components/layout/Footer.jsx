function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <svg className="footer-wave" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,30 C310,100 540,10 790,46 C1030,80 1190,50 1440,15 L1440,0 L0,0 Z" />
      </svg>
      <div className="container">
        <div className="row footer-grid">
          <div className="col-12 col-sm-6 col-lg-3">
            <a className="logo logo--footer" href="#home"><span className="logo__paw">●</span>Pawsitive</a>
            <p>Gentle stays, joyful days.</p>
            <div className="social-links"><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="Facebook">f</a><a href="#contact" aria-label="Pinterest">p</a></div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <h3>Visit us</h3>
            <p>148 Sunny Street<br />Green Meadows, CA</p>
            <p><a href="tel:+1234567890">+1 234 555 0187</a><br />hello@pawsitive.example</p>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <h3>Quick links</h3>
            <ul><li><a href="#boarding">Dog boarding</a></li><li><a href="#boarding">Cat boarding</a></li><li><a href="#pricing">Stay packages</a></li><li><a href="#journal">Pet journal</a></li></ul>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <h3>Newsletter</h3>
            <p>Occasional happy news from the pack.</p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <label className="visually-hidden" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="footer-bottom">© 2026 Pawsitive Pet Retreat. Made for happy paws.</p>
      </div>
    </footer>
  )
}

export default Footer
