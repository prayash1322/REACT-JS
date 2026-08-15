import aboutCards from '../../data/aboutCards'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

function AboutUs() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <SectionHeading title="About Us" text="A small, welcoming retreat where every pet gets the time, attention, and gentle routine they deserve." />
        <div className="row about-cards">
          {aboutCards.map((card) => (
            <div className="col-12 col-sm-6 col-lg-3" key={card.title}>
              <Card className={`about-card about-card--${card.color}`}>
                <span className="about-card__icon">{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <a href="#contact">{card.link} <span>→</span></a>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
