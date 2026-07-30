import React from 'react'

const App = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submited')
  }
  return (
    <div>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input type="text" placeholder='Enter Your Name'/>
        <button>Sumbit</button>
      </form>
    </div>
  )
}

export default App
