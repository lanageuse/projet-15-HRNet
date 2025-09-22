import EmployeeForm from "../components/form/Form";
import { Header } from "../components/header/Header";

type Props = {};

export default function home({}: Props) {
  return (
    <>
      <Header/>
      <div className="main">
        <EmployeeForm />
      </div>
    </>
  );
}
