import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import reviewImage from '../../assets/images/customer_reviews_03.jpg'

const testimonials = [
  {
    title: 'Your pet massages were mesmerising',
    quote: 'Just wanted to let you know how blessed i have been to have you guys care for me over the past few years.',
    name: 'JACK RUSSELL',
    pet: 'Dog',
    image: reviewImage,
  },
  {
    title: 'Every update made us smile',
    quote: 'Our companion came home calm, happy, and full of stories from a wonderful stay.',
    name: 'MAYA BROOKS',
    pet: 'Dog owner',
    image: reviewImage,
  },
]

const ratings = [
  { label: 'STAFF', color: 'peach' },
  { label: 'FACILITY', color: 'mint' },
  { label: 'FOOD', color: 'yellow' },
  { label: 'ACCESSORIES', color: 'aqua' },
]

function Testimonials() {
  return (
    <section className="section reviews" id="testimonials">
      <div className="container">
        <SectionHeading eyebrow="TESTIMONIALS" title="Our Furry Friends Say" />
        <div className="row align-items-center reviews-layout">
          <div className="col-12 col-md-6">
            <Swiper className="review-slider" spaceBetween={24} slidesPerView={1} loop>
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <blockquote className="review-card">
                    <div className="review-quote-wrapper">
                      <Quote className="review-quote-icon" size={38} />
                    </div>
                    <h3 className="review-title">{t.title}</h3>
                    <p className="review-text">{t.quote}</p>
                    <footer>
                      <img loading="lazy" src={t.image} alt={t.name} />
                      <div>
                        <strong>{t.name}</strong>
                        <span>{t.pet}</span>
                      </div>
                    </footer>
                  </blockquote>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-12 col-md-6">
            <div className="ratings">
              {ratings.map((item) => (
                <div className={`rating rating--${item.color}`} key={item.label}>
                  <div className="rating-label">
                    <span>{item.label}</span>
                  </div>
                  <div className="rating-bar">
                    <span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

