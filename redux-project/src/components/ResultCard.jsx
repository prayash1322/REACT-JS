import {useDispatch} from 'react-redux'
import { addedToast, addtoCollection } from '../redux/features/collectionSlice'


const ResultCard = ({item}) => {

  const dispatch = useDispatch()
  const addToCollection = (item) => {
    dispatch(addtoCollection(item))
    dispatch(addedToast())
  }
  return (
    <div className='w-[22vw] relative h-80 bg-amber-50 rounded-xl overflow-hidden'>
        <div className='h-full '>
            <a href={item.url} target="_blank">
                {item.type == 'photo' ? <img loading='lazy' className='h-full w-full object-cover object-center' src={item.src} alt="" />:''}
                {item.type == 'video' ? <video className='h-full w-full object-cover object-center' autoPlay loop muted src={item.src}></video>:''}
                {item.type == 'gif' ? <img loading='lazy' className='h-full w-full object-cover object-center' src={item.src} alt="" />:''}
            </a>
        </div>
      <div id='bottom' className='flex justify-between gap-2 items-center absolute w-full px-3 py-4 bottom-0 text-white'>
        <h2 className='text-lg font-semibold capitalize overflow-hidden truncate max-w-[30ch]'>{item.title}</h2>
        <button onClick={() => {
          addToCollection(item)
        }} className='bg-[#B5B9F0] text-black rounded-3xl active:scale-95 px-4 py-3 font-semibold cursor-pointer'>Save</button>
      </div>
    </div>
  )
}

export default ResultCard
