import { DataTable } from "./dataTable/DataTable";
import { Header } from "./header/Header";

type Props = {
  
};

export default function EmployeeList({}: Props) {
  return (
    <>
    <Header/>
    <DataTable />
    </>
  )
}