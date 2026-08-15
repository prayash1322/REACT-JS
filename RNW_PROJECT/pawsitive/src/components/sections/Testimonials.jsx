import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SectionHeading from '../ui/SectionHeading'

const testimonials = [
  { quote: 'The team noticed every little thing about Teddy—from his shy first hello to the game that made his tail go wild. We collected a very happy dog.', name: 'Maya Brooks', pet: 'Teddy’s person', image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=200&q=80' },
  { quote: 'The photo updates made our trip so much easier. Luna was clearly relaxed, cared for, and enjoying her quiet sunny perch.', name: 'Ari Patel', pet: 'Luna’s person', image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=200&q=80' },
]

const ratings = [['Staff', 96], ['Facility', 92], ['Food', 94], ['Accessories', 88]]

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading eyebrow="TESTIMONIALS" title="Our Furry Friends Say" />
        <div className="row align-items-center testimonials-layout">
          <div className="col-12 col-md-6">
            <Swiper className="testimonial-swiper" spaceBetween={24} slidesPerView={1} loop>
              {testimonials.map((testimonial) => <SwiperSlide key={testimonial.name}>
                <blockquote className="testimonial-card"><span className="testimonial-card__quote">“</span><p>{testimonial.quote}</p><footer><img loading="lazy" src={testimonial.image} alt="" /><div><strong>{testimonial.name}</strong><span>{testimonial.pet}</span></div></footer></blockquote>
              </SwiperSlide>)}
            </Swiper>
          </div>
          <div className="col-12 col-md-6">
            <div className="ratings">
              {ratings.map(([label, value]) => <div className="rating" key={label}><div className="rating__label"><span>{label}</span><span>{value}%</span></div><div className="rating__track"><span style={{ width: `${value}%` }}></span></div></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
