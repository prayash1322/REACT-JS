import React, { createContext, useState } from 'react'

export const themeDataContext = createContext()

const ThemeContext = (props) => {
    const [theme, setTheme] = useState('light')
  return (
    <div>
      <themeDataContext.Provider value={[theme,setTheme]}>
        {props.children}
      </themeDataContext.Provider>
    </div>
  )
}

export default ThemeContext
