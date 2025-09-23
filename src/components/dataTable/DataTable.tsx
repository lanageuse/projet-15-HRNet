import { INITIAL_FORM_DATA } from "../../constants";
import { EMPLOYEE_MOCK_DATA } from "../../mocks/employeesMock";
import { useEmployeeStore } from "../../store/employeeStore";
import style from "./dataTable.module.css";

export const DataTable = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const addMockEmployees = useEmployeeStore(state => state.addMockEmployee)
  const resetMockEmployees = useEmployeeStore(state => state.reset)
  const handleMockEmployee = () => {
    addMockEmployees(EMPLOYEE_MOCK_DATA)
  }
  const handleReset = () => {
    resetMockEmployees()
  }
  return (
    <>
    <div className={style.dataTableContainer}>
    <button onClick={handleMockEmployee} className="my-4">mock Employee</button>
    <button onClick={handleReset} className="my-4">Reset Employee</button>
      <div className={style.dataTable}>
        <table data-slot="table" className={style.table}>
          <thead data-slot="table-header" className={style.thead}>
            <tr className={style.tableRow}>
              {Object.keys(INITIAL_FORM_DATA).map((head) => (
                <th key={head}  className={style.tableHead}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className={style.tableBody}>
            {employees.map((employee, index) => (
              <tr key={index} className={style.tableRow}>
                {Object.values(employee).map((item, index) => (
                  <td key={index} className={style.tableCell}>
                    <div className={style.capitalize}>{item}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
