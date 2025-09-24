import { useDataTable } from '../dataTable/hooks/useDataTable'
import style from './searchDataTable.module.css'
export const SearchDataTable = () => {
  const {searchTerm, handleSearch} = useDataTable()
  return (
    <div className="my-4">
    <input type="search" name="searchDataTable" className={style.searchInput} value={searchTerm} onChange={(e) => handleSearch(e)} placeholder='search...' />
    </div>
  )
}
