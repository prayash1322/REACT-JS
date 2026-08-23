import { Carousel, Container, Row, Col } from 'react-bootstrap'
import { techStack } from '../../data/techStack'
import { chunkArray } from '../../utils/chunkArray'
import TechIcon from '../common/TechIcon'
import SectionTitle from '../common/SectionTitle'

const SLIDE_SIZE = 6
const slides = chunkArray(techStack, SLIDE_SIZE)

function TechStackSlider() {
  return (
    <section
      id="tech-stack"
      className="py-5 py-lg-6"
      style={{ borderBottom: '2px solid var(--color-border)' }}
    >
      <Container fluid="lg">
        <SectionTitle label="Skills" title="Tech Stack" />

        <Carousel interval={4000} pause="hover" indicators={false} controls={false} touch>
          {slides.map((slide, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <Row xs={2} md={3} lg={6} className="g-3">
                {slide.map((tech) => (
                  <Col key={tech.name}>
                    <div className="skill-card d-flex flex-column align-items-center gap-3">
                      <TechIcon iconSet={tech.iconSet} icon={tech.icon} size={30} />
                      <span className="small text-uppercase fw-bold">{tech.name}</span>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${tech.level}%` }} />
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default TechStackSlider
