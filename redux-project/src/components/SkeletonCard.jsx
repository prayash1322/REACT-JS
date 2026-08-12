import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = () => {
  return (
    <div className='w-[22vw] h-80 rounded-xl overflow-hidden'>
      <Skeleton height="100%" borderRadius="0.75rem" baseColor='#2a2a2a' highlightColor='#3a3a3a' />
    </div>
  )
}

export default SkeletonCard
