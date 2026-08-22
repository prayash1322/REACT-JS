import bookingButton from '../../assets/images/text_03.png'
import heroImage from '../../assets/images/hero_home_02.jpg'
import waveImage from '../../assets/images/white_bottom_wave_01.png'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" style={{ backgroundImage: `linear-gradient(rgb(25 25 25 / 28%), rgb(25 25 25 / 28%)), url(${heroImage})` }} aria-hidden="true"></div>
      <div className="container hero-content text-center">
        <p className="hero-eyebrow">PET SPA &amp; BOARDING</p>
        <h1>We keep them happy</h1>
        <a className="hero-btn" href="#contact" aria-label="Book now"><img src={bookingButton} alt="" /></a>
      </div>
      <img className="hero-wave" src={waveImage} alt="" aria-hidden="true" />
    </section>
  )
}

export default Hero
