function SectionTitle({ label, title }) {
  return (
    <div className="mb-5">
      <p className="section-label mb-2">{label}</p>
      <h2 className="section-heading mb-0">{title}</h2>
    </div>
  )
}

export default SectionTitle
