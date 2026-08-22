import { Clock, Star } from 'lucide-react'
import callButton from '../../assets/images/text_04.png'
import checkInImage from '../../assets/images/hero_image_05.png'
import dots from '../../assets/images/dots.png'

function CheckInTime() {
  return (
    <section className="checkin">
      <div className="checkin-layout">
        <div className="checkin-left">
          <div className="checkin-content">
            <p className="title-script">Check-in Time</p>
            <div className="feature-item">
              <span className="feature-icon"><Clock size={16} /></span>
              <div>
                <h3>From 8 AM to 10 PM</h3>
                <p>Timings are drop off after 8am and collection is before 10am on the morning of going home.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon feature-icon-aqua"><Star size={16} /></span>
              <div>
                <h3>Favorite toys</h3>
                <p>If your dog has separation anxiety we encourage you to bring something that smells like home.</p>
              </div>
            </div>
            <a className="checkin-phone" href="tel:+2344566678"><img src={callButton} alt="" /></a>
          </div>
        </div>
        <div className="checkin-right">
          <div className="checkin-photo">
            <img src={checkInImage} alt="Woman holding a dog" />
            <img className="checkin-dot checkin-dot-tr" src={dots} alt="" aria-hidden="true" />
            <img className="checkin-dot checkin-dot-ml" src={dots} alt="" aria-hidden="true" />
            <img className="checkin-dot checkin-dot-br" src={dots} alt="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckInTime
