import { Container, Row, Col } from 'react-bootstrap'
import { useLenis } from '../../context/LenisContext'
import Prayash from "../../assets/me/me-hu.jpg"


function Hero() {
  const lenis = useLenis()

  function scrollToSection(id) {
    const lenisInstance = lenis?.current
    const target = document.getElementById(id)
    if (!target) return

    if (lenisInstance) {
      lenisInstance.scrollTo(target, { offset: -80 })
    } else {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="py-5 py-lg-6"
      style={{ borderBottom: '2px solid var(--color-border)' }}
    >
      <Container fluid="lg">
        <Row className="align-items-center g-5">
          <Col lg={7}>
            <p className="section-label mb-3 fs-5">Hey there</p>
            <h1 className="hero-heading mb-4">
              Hi, I'm
              <br />
              Prayash Jena
            </h1>
            <p className="mb-4" style={{ maxWidth: '48ch', fontSize: '1.1rem' }}>
              Freelance developer, and CEO of Praytex India.
              I build full-stack web and mobile application. Feel Free to Connect.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('work')}
                className="custom-button custom-button-primary"
              >
                View Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="custom-button custom-button-outline"
              >
                Get In Touch
              </button>
            </div>
          </Col>

          <Col lg={5}>
            <div className="hero-portrait-frame">
              <img src={Prayash} alt="Prayash Jena" className="hero-portrait-image" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
