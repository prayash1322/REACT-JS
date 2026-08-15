import Button from '../ui/Button'

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-section__image" aria-hidden="true"></div>
      <div className="container hero-section__content text-center">
        <p className="hero-section__eyebrow">PET SPA &amp; BOARDING</p>
        <h1>We make every stay<br />feel like home</h1>
        <Button href="#contact">Book a stay</Button>
      </div>
      <svg className="hero-wave" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,83 C200,8 375,148 650,116 C920,85 1100,27 1440,82 L1440,180 L0,180 Z" />
      </svg>
    </section>
  )
}

export default Hero
