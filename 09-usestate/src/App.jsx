import React, { useState } from 'react'

const App = () => {

  // const [num, setNum] = useState(20);
  // const [Username, setUsername] = useState('Prayash!')

  // const changeNum = () => {
  //   setNum(30);
  //   setUsername('Prayu!!');
  // }

  const [count, setCount] = useState(0)

  const IncreaseCount = () => {
    setCount(count+1)
  }
  const DecreaseCount = () => {
   setCount(count-1)
  }
  const JumpCount = () => {
   setCount(count+5)
  }
  
  return (
    <div>
  {/* //     <h1>The value of the A is {num}
  //       <br />
  //       Username is :- {Username}
  //     </h1>
  //     <button onClick={changeNum}>Click me !!</button> */}
      <h1>
        Count :- {count}
      </h1>
      <button onClick={IncreaseCount}>Increase</button>
      <button onClick={DecreaseCount}>Decrease</button>
      <button onClick={JumpCount}>Jump By 5</button>
    </div>
  )
}

export default App
