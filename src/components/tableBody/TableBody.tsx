import { useDataTable } from "../dataTable/hooks/useDataTable";
import style from "../dataTable/dataTable.module.css";

/**
 * Composant du corps du tableau des employés
 * Affiche les données des employés
 * Gère l'état de chargement si aucun employé n'est disponible
 */
export const TableBody = () => {
  const { currentItems, searchTerm, handleResetSearch } = useDataTable();
  return (
    <tbody className={style.tableBody}>
      {currentItems.length > 0 ? (
        currentItems.map((employee: any, index: any) => (
          <tr key={index} className={style.tableRow}>
            {Object.values(employee).map((value: any, index) => (
              <td key={index} className={style.tableCell}>
                <div className={style.capitalize}>{value}</div>
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr className={style.tableRow}>
          <td className={style.tableCell} colSpan={9}>
            <div className={style.noResult}>
              {`No result for search "${searchTerm}"`}
              <button className="button button--primary" onClick={handleResetSearch} >Reset search</button>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};
