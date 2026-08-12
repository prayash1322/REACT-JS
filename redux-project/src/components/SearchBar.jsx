import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from '../redux/features/searchSlice';

const SearchBar = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const isDark = useSelector((state) => state.theme.isDark)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setQuery(text))
    }
  return (
    <div>
      <form className={`flex mt-3 gap-5 p-6 ${isDark ? 'bg-[#2E4540]' : 'bg-[#dde8f0]'} rounded-[50px]`} onSubmit={submitHandler}>
        <input required className={`w-full border px-4 py-2 text-xl rounded-3xl outline-none ${isDark ? 'text-white border-white' : 'bg-white text-gray-900 border-gray-300'}`} type="text" placeholder='Search Anything....' value={text} onChange={(e) => setText(e.target.value)} />
        <button className='active:scale-95 border-none px-4 py-2 text-xl rounded-2xl outline-none text-black font-semibold cursor-pointer bg-[#B5B9F0]'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
