import React from 'react'
import { CornerDownRight } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-18 py-8'>
        <h4 className='bg-gray-950 rounded-full text-white px-6 py-2 uppercase tracking-widest leading-none'>Target Audience</h4>
        <button className='bg-gray-200 px-7 py-1.5 uppercase rounded-full tracking-widest text-sm flex cursor-pointer'><CornerDownRight className='size-4.5 ' />Digital Banking Platform</button>
    </div>
  )
}

export default Navbar