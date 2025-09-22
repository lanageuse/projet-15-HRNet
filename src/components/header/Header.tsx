import { Link } from "react-router";
import style from "./header.module.css";

export const Header = () => {
  return (
    <header>
      <nav className={style.nav}>
        <Link to="/" className={style.logo}>
          HRnet
        </Link>
        <Link to="/employees" className={style.link}>
          View Current Employees
        </Link>
      </nav>
    </header>
  );
};
