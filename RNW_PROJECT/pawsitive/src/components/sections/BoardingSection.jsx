import Button from '../ui/Button'

function BoardingSection({ title, text, image, imageAlt, activities, reverse = false, tone }) {
  return (
    <section className={`section boarding-section boarding-section--${tone}`}>
      <div className="container">
        <div className={`row align-items-center ${reverse ? 'boarding-section__row--reverse' : ''}`}>
          <div className="col-12 col-md-6 boarding-section__photo-column">
            <div className="boarding-photo"><img loading="lazy" src={image} alt={imageAlt} /></div>
          </div>
          <div className="col-12 col-md-6 boarding-section__copy">
            <h2>{title}</h2>
            <p>{text}</p>
            <ul className="activity-list">
              {activities.map((activity) => <li key={activity.icon}><span>{activity.icon}</span>{activity.name}</li>)}
            </ul>
            <div className="d-flex flex-wrap gap-2">
              <Button>Book now</Button>
              <Button href="#about" variant="text">View more →</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BoardingSection
