import { useState } from 'react'

const navLinks = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Boarding', 'boarding'],
  ['Rates', 'pricing'],
  ['Stories', 'journal'],
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <button className="logo" type="button" onClick={() => scrollToSection('home')}>
          <span className="logo__paw">●</span>
          Pawsitive
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([label, sectionId]) => (
            <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)}>
              {label}
            </button>
          ))}
          <a className="site-header__phone" href="tel:+1234567890">+1 234 555 0187</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
