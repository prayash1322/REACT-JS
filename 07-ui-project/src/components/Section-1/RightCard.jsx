import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = (props) => {
  return (
    <div className='h-full shrink-0 overflow-hidden relative w-80 rounded-4xl drop-shadow-black'>
        <img className='h-full w-full object-cover' src={props.img} alt="working-women-img" />
        <RightCardContent id={props.id} tag={props.tag} />
    </div>
  )
}

export default RightCard
