const items = ['Prayash Jena','Open For Freelance Work', 'Full Stack Developer']

function MarqueeStrip() {
  const content = [...items, ...items]

  return (
    <div className="scrolling-banner" aria-hidden="true">
      <div className="scrolling-banner-track">
        {content.map((text, index) => (
          <span key={index} className="scrolling-banner-item">
            {text}
            <span>&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default MarqueeStrip
