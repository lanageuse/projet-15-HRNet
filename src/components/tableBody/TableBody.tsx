import { useSearchStore } from "../../store/searchStore";
import type { Employee } from "../../types/types";
import style from "../dataTable/dataTable.module.css";
import { usePagination } from "../pagination/hooks/usePagination";

/**
 * Composant du corps du tableau des employés
 * Affiche les données des employés avec pagination et recherche
 * Gère l'état de chargement si aucun employé n'est disponible
 */
export const TableBody = () => {
  // Récupération des données de pagination et de recherche
  const { indexOfLastItem, indexOfFirstItem, filteredItems, searchTerm } =
    usePagination();
  const handleResetSearch = useSearchStore((state) => state.handleResetSearch);
  
  // Slice des éléments à afficher sur la page
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <tbody className={style.tableBody}>
      {!currentItems.length ? (
        // Affichage quand aucun résultat trouvé
        <tr className={style.tableRow}>
          <td className={style.tableCell} colSpan={9}>
            <div className={style.noResult}>
              <>
                No result for search "{searchTerm}"
                <button
                  className="button button--primary"
                  onClick={handleResetSearch}
                >
                  Reset search
                </button>
              </>
            </div>
          </td>
        </tr>
      ) : (
        // Rendu des lignes du tableau
        currentItems.map((employee: Employee, employeeIndex: number) => (
          <tr 
            key={`${employee.firstName}-${employee.lastName}-${employeeIndex}`} 
            className={style.tableRow}
          >
            {Object.entries(employee).map(([fieldName, value]) => (
              <td key={fieldName} className={style.tableCell}>
                <div className={style.capitalize}>
                  {typeof value === "string" || typeof value === "number"
                    ? value
                    : String(value)}
                </div>
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};