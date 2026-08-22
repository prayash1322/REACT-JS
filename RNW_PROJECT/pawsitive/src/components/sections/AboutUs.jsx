import { House, PawPrint, Dog, Cat } from 'lucide-react'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'
import bg01 from '../../assets/images/inner_card_01.jpg'
import bg02 from '../../assets/images/inner_card_02.jpg'
import bg03 from '../../assets/images/inner_card_03.jpg'
import bg04 from '../../assets/images/inner_card_04.jpg'

const aboutCards = [
  { icon: House, title: 'Location', text: '1426 South Road,\nGreen Meadows VIC\nAustralia', link: 'View More', bg: bg01 },
  { icon: PawPrint, title: 'Contact', text: 'Telephone\n+1300 024 888\n+1300 024 888', link: 'View More', bg: bg02 },
  { icon: Dog, title: 'Dog Boarding', text: "While you're on holiday, here's where furry friends will spend their time.", link: 'Book Now', bg: bg03 },
  { icon: Cat, title: 'Cat Boarding', text: 'We have highest quality accommodations for even the fussiest feline.', link: 'View More', bg: bg04 },
]

function AboutUs() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading
          title="About Us"
          text="From the time our friends sniff their way through the door until they wag their tails out in the afternoon, we cater to their nature."
        />
        <div className="row about-grid">
          {aboutCards.map((card) => {
            const Icon = card.icon
            return (
              <div className="col-12 col-sm-6 col-lg-3" key={card.title}>
                <Card className="about-item" style={{ backgroundImage: `url(${card.bg})` }}>
                  <span className="about-item-icon"><Icon size={36} strokeWidth={1.25} /></span>
                  <h3>{card.title}</h3>
                  <p>{card.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                  <a href="#contact" className="about-item-link">
                    {card.link.toUpperCase()} <span>→</span>
                  </a>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
