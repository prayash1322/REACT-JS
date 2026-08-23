import { Container, Row, Col } from 'react-bootstrap'
import { workItems } from '../../data/workItems'
import ProjectCard from './ProjectCard'
import SectionTitle from '../common/SectionTitle'

function Work() {
  return (
    <section
      id="work"
      className="py-5 py-lg-6"
      style={{ borderBottom: '2px solid var(--color-border)' }}
    >
      <Container fluid="lg">
        <SectionTitle label="Selected" title="Work" />

        <Row xs={1} md={2} lg={3} className="g-4">
          {workItems.map((item, index) => (
            <Col key={item.id}>
              <ProjectCard index={index + 1} {...item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Work
