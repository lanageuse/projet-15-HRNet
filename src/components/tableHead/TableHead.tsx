import { INITIAL_FORM_DATA } from "@constants/form";
import { useSortStore } from "@store";
import style from "../dataTable/dataTable.module.css";

/**
 * Composant d'en-tête du tableau des employés
 * Affiche les colonnes avec possibilité de tri
 */
export const TableHead = () => {
  const theadItems = INITIAL_FORM_DATA
  const sortBy = useSortStore(state => state.sortBy)
  const sortOrder = useSortStore(state => state.sortOrder)
  const handleSort = useSortStore(state => state.handleSort)
  return (
    <thead className={style.thead}>
      <tr className={style.tableRow}>
        {Object.keys(theadItems).map((item) => (
          <th
            key={item}
            className={style.tableHead}
            onClick={()=>handleSort(item as keyof typeof theadItems)}
          >
            {item} <span>{sortBy === item && (sortOrder === "asc" ? "↑↓" : "↓↑")}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
