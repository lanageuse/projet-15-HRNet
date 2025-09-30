import { EmployeeForm } from "@components";
import { Header } from "@components";

type Props = {};

export default function home({}: Props) {
  return (
    <>
      <Header />
      <div className="main">
        <EmployeeForm />
      </div>
    </>
  );
}
