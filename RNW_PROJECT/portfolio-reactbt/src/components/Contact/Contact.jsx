import { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Mail, Phone, Send } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required'
    }
    if (!EMAIL_PATTERN.test(formData.email)) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required'
    }
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 800)
  }

  return (
    <section id="contact" className="py-5 py-lg-6">
      <Container fluid="lg">
        <SectionTitle label="Say hello" title="Get In Touch" />

        <Row className="g-5">
          <Col md={5}>
            <p className="mb-4" style={{ maxWidth: '34ch' }}>
              Full-stack Developer, CEO of Praytex India, feel free to connect with me.
            </p>
            <p className="status-text mb-4">Available for projects</p>

            <div className="d-flex gap-2">
              <a href="mailto:prayash1305@gmail.com" aria-label="Email" className="icon-button">
                <Mail size={18} />
              </a>
              <a href="https://github.com/Prayash1322" aria-label="GitHub" className="icon-button">
                <i className="bi bi-github" />
              </a>
              <a href="#" aria-label="LinkedIn" className="icon-button">
                <i className="bi bi-linkedin" />
              </a>
            </div>
          </Col>

          <Col md={7}>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="contactName">
                <Form.Label className="section-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                  isInvalid={!!errors.name}
                  placeholder="Your name"
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="contactEmail">
                <Form.Label className="section-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                  isInvalid={!!errors.email}
                  placeholder="you@email.com"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="contactMessage">
                <Form.Label className="section-label">Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input"
                  isInvalid={!!errors.message}
                  placeholder="What are you building?"
                />
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              </Form.Group>

              <button
                type="submit"
                className="custom-button custom-button-primary"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </button>

              {status === 'success' && (
                <p className="status-text mt-3 mb-0">Message sent, talk soon</p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
