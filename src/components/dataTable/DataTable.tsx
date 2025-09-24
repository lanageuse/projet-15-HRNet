import { Pagination } from "../pagination/Pagination";
import style from "./dataTable.module.css";
import { Thead } from "./UI/Thead";
import { Tbody } from "./UI/Tbody";
import { EMPLOYEE_MOCK_DATA } from "../../mocks/employeesMock";
import { useEmployeeStore } from "../../store/employeeStore";
import { DataTableProvider } from "./context/DataTableContext";
import { SearchDataTable } from "../search/SearchDataTable";

/**
 * Composant principal du tableau de données des employés
 * Affiche la liste des employés avec pagination et boutons de test
 * Inclut les fonctionnalités d'ajout de données fictives et de réinitialisation
 */
export const DataTable = () => {
  const addMockEmployees = useEmployeeStore((state) => state.addMockEmployee);
  const resetMockEmployees = useEmployeeStore((state) => state.reset);
  
  /**
   * Ajoute des employés fictifs pour les tests
   */
  const handleMockEmployee = () => {
    addMockEmployees(EMPLOYEE_MOCK_DATA);
  };
  
  /**
   * Remet à zéro la liste des employés
   */
  const handleReset = () => {
    resetMockEmployees();
  };

  return (
    <>
      <DataTableProvider>
        <div className={style.dataTableContainer}>
          <button onClick={handleMockEmployee} className="my-4">
            mock Employee
          </button>
          <button onClick={handleReset} className="my-4">
            Reset Employee
          </button>
            <SearchDataTable/>
          <div className={style.dataTable}>
            <table data-slot="table" className={style.table}>
              <Thead />
              <Tbody />
            </table>
          </div>
          <Pagination />
        </div>
      </DataTableProvider>
    </>
  );
};
