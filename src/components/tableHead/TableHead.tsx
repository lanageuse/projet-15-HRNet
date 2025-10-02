import { useSortStore } from "@store";
import style from "../dataTable/dataTable.module.css";
import { TABLE_HEAD_DATA } from "@constants/tableHead";
import { useMemo } from "react";

/**
 * Composant d'en-tête du tableau
 * Affiche les colonnes avec possibilité de tri
 */
export const TableHead = () => {
  const theadItems = useMemo(() => Object.entries(TABLE_HEAD_DATA), [])
  const sortBy = useSortStore(state => state.sortBy)
  const sortOrder = useSortStore(state => state.sortOrder)
  const handleSort = useSortStore(state => state.handleSort)
  return (
    <thead className={style.thead}>
      <tr className={style.tableRow}>
        {theadItems.map( (item) => {
          const [key, label] = item
          return (
            <th
            key={`${label}-${key}`}
            className={style.tableHead}
            onClick={()=>handleSort(key as keyof typeof TABLE_HEAD_DATA)}
          >
            {label} <span>{sortBy === key && (sortOrder === "asc" ? "↑↓" : "↓↑")}</span>
          </th>
          )
        }
        )}
      </tr>
    </thead>
  );
};
