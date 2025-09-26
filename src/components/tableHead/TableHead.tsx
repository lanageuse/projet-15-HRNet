import { useDataTable } from "../dataTable/hooks/useDataTable";
import style from "../dataTable/dataTable.module.css";

/**
 * Composant d'en-tête du tableau des employés
 * Affiche les colonnes avec possibilité de tri
 */
export const TableHead = () => {
  const { theadItems, handleSort, sortBy, sortOrder } = useDataTable();
  
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
