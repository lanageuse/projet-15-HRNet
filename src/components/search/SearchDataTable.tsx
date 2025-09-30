import { useSearchStore } from '../../store/searchStore';
import style from './searchDataTable.module.css'
export const SearchDataTable = () => {
   const searchTerm = useSearchStore(state => state.searchTerm)
   const handleSearch = useSearchStore(state => state.handleSearch)
  return (
    <div className="my-4">
    <input type="search" name="searchDataTable" className={style.searchInput} value={searchTerm} onChange={(e) => handleSearch(e)} placeholder='search...' />
    </div>
  )
}
