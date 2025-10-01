import { EmployeeForm } from "@components";
import { Header } from "@components";
export default function home() {
  return (
    <>
      <Header />
      <div className="main">
        <EmployeeForm />
      </div>
    </>
  );
}
