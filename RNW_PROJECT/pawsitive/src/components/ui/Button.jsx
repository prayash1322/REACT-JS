function Button({ children, href = '#contact', variant = 'primary', onClick }) {
  const cls = variant === 'text' ? 'btn btn-text' : variant === 'outline' ? 'btn btn-outline' : 'btn'

  if (onClick) {
    return <button className={cls} type="button" onClick={onClick}>{children}</button>
  }

  return <a className={cls} href={href}>{children}</a>
}

export default Button
