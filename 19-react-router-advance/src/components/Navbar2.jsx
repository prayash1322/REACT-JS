import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar2 = () => {
  const navi = useNavigate()
  const btnClicked = () => {
    navi('/')
  }  
  return (
    <div className='py-2 px-4 bg-cyan-200'>
      <button onClick={() => {
        navi('/')
      }} 
        className='bg-emerald-300 font-medium py-2 px-4 rounded m-2 cursor-pointer active:scale-98'>
        Return to Home Page
      </button>
      <button onClick={()=>{
        navi(-1)
      }} 
        className='bg-emerald-300 font-medium py-2 px-4 rounded m-2 cursor-pointer active:scale-98'>
        Back
      </button>
      <button onClick={()=>{
        navi(+1)
      }} 
        className='bg-emerald-300 font-medium py-2 px-4 rounded m-2 cursor-pointer active:scale-98'>
        Next
      </button>
    </div>
  )
}

export default Navbar2
