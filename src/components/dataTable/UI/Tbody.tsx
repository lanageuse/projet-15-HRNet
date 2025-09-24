import { useDataTable } from "../hooks/useDataTable";
import style from "../dataTable.module.css";

/**
 * Composant du corps du tableau des employés
 * Affiche les données des employés
 * Gère l'état de chargement si aucun employé n'est disponible
 */
export const Tbody = () => {
  const {sortedEmployees} = useDataTable()
  return sortedEmployees ? (
    <tbody className={style.tableBody}>
      {sortedEmployees.map((employee: any, index: any) => (
        <tr key={index} className={style.tableRow}>
          {Object.values(employee).map((value: any, index) => (
            <td key={index} className={style.tableCell}>
              <div className={style.capitalize}>{value}</div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  ) : (
    <div>Loading ...</div>
  );
};
