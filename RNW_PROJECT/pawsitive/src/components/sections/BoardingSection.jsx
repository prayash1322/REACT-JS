import Button from '../ui/Button'
import dotsImg from '../../assets/images/dots.png'

function BoardingSection({ title, text, image, imageAlt, activities, reverse = false }) {
  return (
    <section className="boarding">
      <div className={`boarding-layout${reverse ? ' boarding-layout-reverse' : ''}`}>
        <div className="boarding-photo-col">
          <div className="boarding-photo">
            <img loading="lazy" src={image} alt={imageAlt} />
          </div>
          {reverse && <>
            <img className="boarding-dot boarding-dot-1" src={dotsImg} alt="" aria-hidden="true" />
            <img className="boarding-dot boarding-dot-2" src={dotsImg} alt="" aria-hidden="true" />
          </>}
        </div>
        <div className="boarding-text-col boarding-copy">
          <h2>{title}</h2>
          <p>{text}</p>
          <ul className="activities">
            {activities.map((activity) => (
              <li key={activity.name}><span>{activity.icon}</span>{activity.name}</li>
            ))}
          </ul>
          <div className="d-flex flex-wrap gap-2">
            <Button>Book now</Button>
            <Button href="#about" variant="text">View more →</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BoardingSection
