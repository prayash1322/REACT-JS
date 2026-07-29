import React from 'react'
import RightCard from './RightCard'

const RightContent = (props) => {
  return (
    <div className='h-full overflow-x-auto scrollbar-none p-6 w-2/3 flex gap-6 flex-nowrap'>
        {props.users.map((elem,idx) => {
          return <RightCard key={idx} id={idx+1} img={elem.img} tag={elem.tag} />;
        })}
    </div>
  )
}

export default RightContent