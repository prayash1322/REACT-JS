import { MapPin, Phone, Clock, PawPrint } from 'lucide-react'
import lineDots from '../../assets/images/line_dots.png'
import dots from '../../assets/images/dots.png'

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-wave-container">
        <svg className="footer-wave-svg" viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C380,85 700,10 1020,65 C1220,100 1360,40 1440,15 L1440,0 L0,0 Z" fill="#ffffff" />
          <path d="M0,0 C380,85 700,10 1020,65 C1220,100 1360,40 1440,15" stroke="#303034" strokeWidth="1.8" fill="none" />
        </svg>

        <img className="footer-anim-dot-left" src={lineDots} alt="" aria-hidden="true" />
        <img className="footer-anim-dot-mid" src={dots} alt="" aria-hidden="true" />
        <img className="footer-anim-dot-right" src={dots} alt="" aria-hidden="true" />
      </div>

      <div className="container footer-content">
        <div className="row footer-cols">
          <div className="col-12 col-sm-6 col-lg-3">
            <a className="footer-brand" href="#home">
              <div className="footer-brand-wrap">
                <PawPrint className="footer-brand-paw" size={32} fill="currentColor" />
                <div className="footer-brand-text">
                  <span className="footer-brand-title">Pawsitive</span>
                  <span className="footer-brand-subtitle">Pet Boarding Center</span>
                </div>
              </div>
            </a>
            <div className="social-icons">
              <a href="#contact" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a href="#contact" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#contact" aria-label="Facebook">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3>About</h3>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={16} className="footer-contact-icon" />
                <span>PO BOX Collins Street West</span>
              </li>
              <li>
                <Phone size={16} className="footer-contact-icon" />
                <span>+2342 5446 67</span>
              </li>
              <li>
                <Clock size={16} className="footer-contact-icon" />
                <span>Mon - Sun: 8AM - 8PM</span>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3>Quick Links</h3>
            <ul className="footer-links-list">
              <li><a href="#boarding">Dog Boarding Services</a></li>
              <li><a href="#boarding">Cat Boarding Services</a></li>
              <li><a href="#packing">Spa and Grooming Services</a></li>
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <h3>Newsletter</h3>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <label className="visually-hidden" htmlFor="footer-newsletter-email">Your email</label>
              <input
                id="footer-newsletter-email"
                type="email"
                placeholder="Your email"
                required
              />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
