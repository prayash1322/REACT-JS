import { Container, Row, Col } from 'react-bootstrap'
import { Mail, Phone } from 'lucide-react'
import { useLenis } from '../../context/LenisContext'


const quickLinks = [
  { label: 'Home', target: 'home' },
  { label: 'Tech Stack', target: 'tech-stack' },
  { label: 'Work', target: 'work' },
  { label: 'Contact', target: 'contact' },
]

function Footer() {
  const year = new Date().getFullYear()
  const lenis = useLenis()

  function scrollToSection(id) {
    const lenisInstance = lenis?.current

    if (id === 'home') {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { offset: 0 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const target = document.getElementById(id)
    if (!target) return

    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset: -80 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-5" style={{ borderTop: '2px solid var(--color-border)' }}>
      <Container fluid="lg">
        <Row className="g-4">
          <Col md={4}>
            <p className="fw-bold text-uppercase mb-2">Prayash Jena</p>
            <p className="project-card-muted-text">
              Full Stack Developer, and CEO of Praytex India,
              building amazing apps and websites.
            </p>
          </Col>

          <Col md={4}>
            <p className="section-label mb-3">Quick Links</p>
            <div className="d-flex flex-column gap-2">
              {quickLinks.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="nav-item-link text-start"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Col>

          <Col md={4}>
            <p className="section-label mb-3">Connect</p>
            <p className="mb-2 d-flex align-items-center gap-2">
              <Phone size={16} />
              <a href="tel:+919726613507" className="text-reset text-decoration-none">
                +91 97266 13507
              </a>
            </p>
            <p className="mb-4 d-flex align-items-center gap-2">
              <Mail size={16} />
              <a href="mailto:prayash1305@gmail.com" className="text-reset text-decoration-none">
                prayash1305@gmail.com
              </a>
            </p>
            <div className="d-flex gap-2">
              <a href="mailto:prayash1305@gmail.com" aria-label="Email" className="icon-button">
                <Mail size={18} />
              </a>
              <a href="https://github.com/Prayash1322" aria-label="GitHub" className="icon-button">
                <i className="bi bi-github" />
              </a>
              <a href="https://in.linkedin.com/in/prayash-jena" aria-label="LinkedIn" className="icon-button">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: 'var(--color-border)', opacity: 1, borderWidth: '2px' }} className="my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between small">
          <span className="project-card-muted-text">© {year} Prayash Jena. All rights reserved.</span>
          <span className="status-text">All systems operational</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
