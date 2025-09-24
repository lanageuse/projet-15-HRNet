import { useDataTable } from "../hooks/useDataTable";
import style from "../dataTable.module.css";

/**
 * Composant d'en-tête du tableau des employés
 * Affiche les colonnes avec possibilité de tri (fonctionnalité en développement)
 */
export const Thead = () => {
  const { theadItems } = useDataTable();
  
  return (
    <thead className={style.thead}>
      <tr className={style.tableRow}>
        {Object.keys(theadItems).map((item) => (
          <th
            key={item}
            className={style.tableHead}
          >
            {item} <span>⇅</span>
          </th>
        ))}
      </tr>
    </thead>
  );
};
