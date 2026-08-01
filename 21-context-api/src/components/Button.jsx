import React, { useContext } from 'react'
import { themeDataContext } from '../context/ThemeContext'

const Button = () => {

    const [theme,setTheme] = useContext(themeDataContext)

    const changeTheme = () => {
        setTheme('dark')
    }
  return (
    <div>
      <button onClick={changeTheme}>Change Theme</button>
    </div>
  )
}

export default Button
