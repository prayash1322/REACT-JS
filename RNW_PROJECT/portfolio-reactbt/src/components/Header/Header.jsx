import { useEffect, useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLenis } from '../../context/LenisContext'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { label: 'Home', target: 'home' },
  { label: 'Tech Stack', target: 'tech-stack' },
  { label: 'Work', target: 'work' },
  { label: 'Contact', target: 'contact' },
]

function Header() {
  const [expanded, setExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const lenis = useLenis()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function scrollToSection(id) {
    setExpanded(false)
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
    <Navbar expand="lg" fixed="top" expanded={expanded} className="site-navbar px-3 py-3">
      <Container fluid="lg">
        <Navbar.Brand
          as="button"
          onClick={() => scrollToSection('home')}
          className="border-0 bg-transparent p-0 fw-bold text-uppercase"
          style={{ color: 'var(--color-text)', letterSpacing: '-0.02em', fontSize: '1.55rem' }}
        >
          Prayash Jena
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3 order-lg-3 ms-lg-4">
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="custom-button custom-button-primary d-none d-lg-inline-flex"
          >
            Let's Talk
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            className="icon-button d-lg-none"
            aria-label="Toggle navigation"
            aria-expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <Navbar.Collapse id="main-nav">
          <Nav className="ms-lg-auto align-items-lg-center gap-lg-4 mt-4 mt-lg-0">
            {navItems.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => scrollToSection(item.target)}
                className={`nav-item-link ${activeSection === item.target ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="custom-button custom-button-primary d-lg-none mt-3"
            >
              Let's Talk
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
