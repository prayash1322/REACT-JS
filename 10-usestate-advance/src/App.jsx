import React, { useState } from 'react'

const App = () => {
  
  const [num, setNum] = useState(10)

  const btnClicked = () => {
    // const newNum = {...num};
    // newNum.user = "Om";
    // newNum.age = 21;
    // setNum(newNum);

    // const newNum = [...num]
    // newNum.push(40);

    // setNum(newNum);

    // setNum(prev=>({...prev,age:12}))

    // setNum(num+1)
    // setNum(num+1)
    // setNum(num+1) // This is not a batch update and it will not increase the number by 3
    // To do that we will use 
    // Batch Update!
    setNum((prev)=>prev+1)
    setNum((prev)=>prev+1)
    setNum((prev)=>prev+1)
  }

  return (
    <div>
      <h1>{num}</h1>
      <button onClick={btnClicked}>Kilick</button>
    </div>
  )
}

export default App
