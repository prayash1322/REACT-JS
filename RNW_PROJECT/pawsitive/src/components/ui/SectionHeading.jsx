function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="section-heading__text">{text}</p>}
    </div>
  )
}

export default SectionHeading
