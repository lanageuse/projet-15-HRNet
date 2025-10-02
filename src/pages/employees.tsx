import { Header } from "@components";
import { DataTable } from "@components/dataTable/DataTable";

export default function employeesList() {
  return (
    <>
      <Header />
      <div className="main">
        <DataTable />
      </div>
    </>
  );
}
