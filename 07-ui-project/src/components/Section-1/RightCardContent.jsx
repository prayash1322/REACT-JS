import React from 'react'
import { ArrowRight } from 'lucide-react'



const RightCardContent = (props) => {

  return (
      <div className='absolute top-0 left-0 h-full w-full bg-linear-to-b from-black/5 via-black/45 to-black/85 p-8 flex flex-col justify-between'>
            <h2 className='bg-white rounded-full h-12 w-12 flex justify-center items-center font-semibold text-xl'>{props.id}</h2>
            <div>
                <p className='text-shadow-2xl font-semibold text-lg leading-relaxed text-white mb-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente iste assumenda cumque impedit esse maiores.</p>
                <div className='flex justify-between'>
                    <button className='bg-blue-600 text-white text-lg font-medium rounded-full px-10 py-2 cursor-pointer'>{props.tag}</button>
                    <button className='bg-blue-600 text-white rounded-full  p-5 cursor-pointer'><ArrowRight className='size-4' /></button>
                </div>
            </div>
        </div>
  )
}


export default RightCardContent
