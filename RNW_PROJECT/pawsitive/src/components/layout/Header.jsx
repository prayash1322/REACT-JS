import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import logo from '../../assets/images/logo_blue.png'

const navItems = [
  ['Home', 'home'],
  ['Pages', 'about'],
  ['Blog', 'journal'],
  ['Shop', 'pricing'],
  ['Elements', 'packing'],
]

const menus = {
  Pages: ['About Us', 'Team', 'Our Process', 'Timeline', 'Services', 'Single Service', 'Prices', 'Contact', 'Coming Soon'],
  Blog: ['Standard View', 'Columns View', 'Simple View', 'Grid View', 'Single Post', 'Gallery'],
  Elements: ['Base', 'Headlines', 'Buttons & Icons', 'Images', 'Inner Row & Column', 'Countdown & Counter', 'Card', 'Progress & Advanced Bar', 'Price List & Single Product', 'Google & OpenStreet Maps', 'Service', 'Accordions & Tabs', 'Organic Animation', 'Team', 'Slider', 'Testimonials', 'Cost Calculator', 'Blog Layouts'],
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-inner">
        <button className="logo" type="button" onClick={() => scrollToSection('home')}>
          <img src={logo} alt="Pawsitive" />
        </button>
        <button className="hamburger" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <nav className={`nav-menu${menuOpen ? ' nav-menu-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, sectionId]) => (
            <div
              className="nav-link-item"
              key={label}
              onMouseEnter={() => setActiveMenu(label)}
              onMouseLeave={() => setActiveMenu('')}
            >
              <button type="button" onClick={() => scrollToSection(sectionId)}>{label}</button>
              {menus[label] && activeMenu === label && (
                <div className={`dropdown${label === 'Elements' ? ' dropdown-wide' : ''}`}>
                  {menus[label].map((item) => (
                    <a href={`#${sectionId}`} key={item} onClick={() => setActiveMenu('')}>{item}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a className="navbar-phone" href="tel:+1235455677">
            <Phone size={16} aria-hidden="true" />
            +1235 455 677
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
