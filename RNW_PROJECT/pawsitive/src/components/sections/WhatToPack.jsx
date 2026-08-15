import SectionHeading from '../ui/SectionHeading'

const packingItems = [
  ['✓', 'Bring their food', 'Keep their regular mealtime routine familiar.'],
  ['+', 'Dietary supplements', 'Let us know about any supplements or special needs.'],
  ['✓', 'Documents required', 'Please bring current vaccination records.'],
  ['♥', 'A reminder of home', 'A favourite toy or blanket can make all the difference.'],
]

function WhatToPack() {
  return (
    <section className="section pack-section" id="packing">
      <div className="container">
        <SectionHeading eyebrow="TIPS AND TRICKS" title="What to Pack" />
        <div className="pack-layout">
          <div className="pack-list pack-list--left">
            {packingItems.slice(0, 2).map(([icon, title, text]) => <div className="pack-item" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
          <img loading="lazy" className="pack-image" src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&q=85" alt="Dog and cat together" />
          <div className="pack-list pack-list--right">
            {packingItems.slice(2).map(([icon, title, text]) => <div className="pack-item" key={title}><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatToPack
