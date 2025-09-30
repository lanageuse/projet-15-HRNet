import { Pagination } from "@components";
import { TableHead } from "@components";
import { TableBody } from "@components";
import { EMPLOYEE_MOCK_DATA } from "@mocks/employeesMock";
import { useEmployeeStore } from "@store";
import { SearchDataTable } from "@components";
import { ItemsPerPage } from "@components";
import style from "./dataTable.module.css";

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
        <div className={style.dataTableContainer}>
          <button
            onClick={()=> handleMockEmployee()}
            className="my-4 button button--primary"
          >
            mock Employee
          </button>{" "}
          <button onClick={()=> handleReset()} className="my-4 button button--primary">
            Reset Employee
          </button>
          <div className={style.dataTableHeader}>
            <SearchDataTable />
            <ItemsPerPage/>
          </div>
          <div className={style.dataTable}>
            <table data-slot="table" className={style.table}>
              <TableHead />
              <TableBody />
            </table>
          </div>
          <Pagination />
        </div>
    </>
  );
};
