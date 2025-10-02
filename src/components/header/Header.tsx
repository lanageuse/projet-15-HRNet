import { Link, useLocation } from "react-router";
import style from "./header.module.css";

/**
 * Composant d'en-tête de l'application avec navigation.
 */
export const Header = () => {
  let location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <header>
      <nav className={style.nav}>
        <Link to="/" className={style.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="100 -35 620 230"
            width="200px"
            height="50px"
          >
            <polygon
              points="100,20 170,60 170,140 100,180 30,140 30,60"
              fill="none"
              strokeWidth="5"
            />
            <circle cx="100" cy="20" r="16" />
            <circle cx="170" cy="60" r="16" />
            <circle cx="170" cy="140" r="16" />
            <circle cx="100" cy="180" r="16" />
            <circle cx="30" cy="140" r="16" />
            <circle cx="30" cy="60" r="16" />
            <text
              x="60%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="6rem"
              fill="white"
            >
              HRnet
            </text>
          </svg>
        </Link>
        <Link to={isHomePage ? "/employees" : "/"} className={style.link}>
          {isHomePage ? "→ View Current Employees" : "→ Add Employee" }
        </Link>
      </nav>
    </header>
  );
};
