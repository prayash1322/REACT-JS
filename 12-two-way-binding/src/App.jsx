import React from 'react'
import { useState } from 'react';

const App = () => {

  const [name, setName] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Form Submitted By',name)
    setName("")
  }
  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input type="text" placeholder='Enter Your Name' value={name} onChange={(e) => {
          setName(e.target.value);
        }}/>
        <button>Sumbit</button>
      </form>
    </div>
  )
}

export default App
