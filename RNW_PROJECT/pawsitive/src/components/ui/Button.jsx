function Button({ children, href = '#contact', variant = 'primary', onClick }) {
  const className = `button button--${variant}`

  if (onClick) {
    return (
      <button className={className} type="button" onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}

export default Button
