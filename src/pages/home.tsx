import { Link } from "react-router";
import EmployeeForm from "../components/EmployeeForm";

type Props = {
  
};

export default function home({}: Props) {
  return (
    <div>
        <EmployeeForm/>
        <Link to='/employees'>View Current Employees</Link>
    </div>
  )
}