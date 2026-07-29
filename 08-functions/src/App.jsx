import React from 'react'

const App = () => {


  return (
    <div onWheel={() => {
      console.log("Page Scrolling!!")
    }}>
      {/* <h1>Hello,Prayash</h1>

      <button>Change User!</button>

      <input onChange={(elem) => {
        console.log(elem.target.value);
      }} type="text" placeholder='Please Enter the Name' /> */}

      <div className='page1'></div>
      <div className='page2'></div>
      <div className='page3'></div>
    </div>
  )
}

export default App
