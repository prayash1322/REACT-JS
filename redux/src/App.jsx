import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, decrementByAmount, increment, incrementByAmount } from './redux/features/counterSlice'

const App = () => {

  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [num, setNum] = useState(5)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => {
        dispatch(increment())
      }}>Increment</button>
      <button onClick={() => {
        dispatch(decrement())
      }}>Decrement</button>
      <input type="number" placeholder='Enter a amount to increase' value={num} onChange={(e) =>{
        setNum(e.target.value)
      }} />
      <button onClick={() => {
        dispatch(incrementByAmount(Number(num)))
      }}>Increase by {num}</button>
      <button onClick={() => {
        dispatch(decrementByAmount(Number(num)))
      }}>Decrease by {num}</button>
    </div>
  )
}

export default App
