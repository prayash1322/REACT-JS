import SearchBar from '../components/SearchBar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const { query } = useSelector((store) => store.search)
    
  return (
    <div className="px-4 sm:px-10 py-4">
      <SearchBar />
      
      {query != ''? <div>
        <Tabs />
        <ResultGrid />
      </div>:''}
    </div>
  )
}

export default HomePage
