function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`heading${align === 'left' ? ' heading-left' : ''}`}>
      {eyebrow && <p className="heading-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="heading-text">{text}</p>}
    </div>
  )
}

export default SectionHeading
