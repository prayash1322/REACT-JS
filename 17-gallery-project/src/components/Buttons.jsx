import React from 'react'

const Buttons = ({ index, setIndex, setUserdata }) => {
  return (
    <div>
      <div className="flex justify-center items-center p-3 gap-5">
        <button
        style={{opacity: index == 1 ? 0.7:1}}
        onClick={() => {
          if(index > 1){
            setIndex(index-1)
            setUserdata([])
          }
        }} className="bg-emerald-500 text-xs active:scale-95 font-medium rounded px-4 py-2 cursor-pointer">
          Prev
        </button>
        <h4>Page {index}</h4>
        <button onClick={() => {
          setUserdata([])
          setIndex(index+1)
        }} className="bg-emerald-500 text-xs active:scale-95 font-medium rounded px-4 py-2 cursor-pointer">
          Next
        </button>
      </div>
    </div>
  )
}

export default Buttons
