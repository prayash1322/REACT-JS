function Card({ children, className = '', style }) {
  return <article className={`card ${className}`} style={style}>{children}</article>
}

export default Card
