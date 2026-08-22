import packImage from '../../assets/images/inner_image_01.png'
import { Check } from 'lucide-react'

const leftItems = [
  { title: 'Bring Your Own Food', text: 'Use small plastic baggies to package pre-measured meals and label them.', color: 'mint' },
  { title: 'Dietary Supplements', text: 'Include the appropriate number of doses that your dog will need to take in your absence.', color: 'peach' },
]

const rightItems = [
  { title: 'Documents Required', text: 'Be sure that all required documents and forms are ready to present on drop off day.', color: 'yellow' },
  { title: 'A reminder of Home', text: 'To keep your dog feeling close to you in your absence, include something with your scent.', color: 'mint' },
]

function WhatToPack() {
  return (
    <section className="pack" id="packing">
      <div className="container">
        <div className="pack-heading">
          <p className="pack-eyebrow">TIPS AND TRICKS</p>
          <h2 className="pack-title">What to Pack</h2>
        </div>
        <div className="pack-grid">
          <div className="pack-list">
            {leftItems.map((item) => (
              <div className="pack-item" key={item.title}>
                <span className={`pack-icon pack-icon--${item.color}`}><Check size={18} strokeWidth={2.5} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pack-center">
            <img src={packImage} alt="Dog and cat together" loading="lazy" />
          </div>
          <div className="pack-list">
            {rightItems.map((item) => (
              <div className="pack-item" key={item.title}>
                <span className={`pack-icon pack-icon--${item.color}`}><Check size={18} strokeWidth={2.5} /></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatToPack
