import React, { useState } from 'react'

const App = () => {
  const [name, setName] = useState('prayash')
  const [user, setUser] = useState({ name: "Prayash", age: 25 });

  setUser(prevUser => ({
  ...prevUser, 
  age: 26
}));

  const newName = [...name,setName]
  return (
    <div>
      <h1>{newName}</h1>
      
      <button
        onClick={() => {
          setName('richa')
        }}
      >Submit</button>
    </div>
  )
}

export default App
