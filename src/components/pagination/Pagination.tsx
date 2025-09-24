import { useDataTable } from "../dataTable/hooks/useDataTable";
import style from "./pagination.module.css";

/**
 * Composant de pagination pour naviguer entre les pages d'employés
 * Affiche les contrôles de navigation (précédent, numéros de page, suivant)
 */
export const Pagination = () => {
  const { setCurrentPage, currentPage, totalEmployees, pageNumbers, isLastPage, isFirstPage } =
    useDataTable();

  /**
   * Gère la navigation vers une page spécifique
   * @param pageNumber - Numéro de la page à afficher
   * @param e - Événement de clic pour empêcher le comportement par défaut du lien
   */
  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };
  return (
    <nav className={style.nav}>
        <div className="">
            { `${currentPage} of ${pageNumbers.length} pages (${totalEmployees} employees)`}
        </div>
      <ul className={style.pagination}>
        {isFirstPage ? (
          ""
        ) : (
          <li>
            <a
              onClick={(e) => paginate(currentPage - 1, e)}
              href="!#"
              className={style.paginationLink}
            >
              prev
            </a>
          </li>
        )}
        {pageNumbers.map((number : number) => (
          <li
            key={number}
            className={`${style.paginationItem} ${
              currentPage === number ? `${style.active}` : ""
            }`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className={style.paginationLink}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          {isLastPage ? (
            ""
          ) : (
            <a
              onClick={(e) => paginate(currentPage + 1, e)}
              href="!#"
              className={style.paginationLink}
            >
              next
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};
