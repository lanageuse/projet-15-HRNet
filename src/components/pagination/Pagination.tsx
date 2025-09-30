import { useCallback } from "react";
import style from "./pagination.module.css";
import { usePagination } from "./hooks/usePagination";

/**
 * Composant de pagination pour naviguer entre les pages d'employés
 * Affiche les contrôles de navigation (précédent, numéros de page, suivant)
 */
export const Pagination = () => {

  const {currentPage, setCurrentPage, totalItems, isLastPage, isFirstPage, pageNumbers, indexOfFirstItem, indexOfLastItem} = usePagination()


  /**
   * Fonction pour naviguer vers une page spécifique
   * @param pageNumber - Numéro de la page à afficher
   * @param e - Événement de clic pour empêcher le comportement par défaut
   */
  const paginate = useCallback(
    (pageNumber: number, e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );

  return (
    <nav className={style.nav}>
      <div className="">
        {`Showing ${totalItems === 0 ? 0 : Math.max(indexOfFirstItem, 1)} to ${
          Math.min(indexOfLastItem, totalItems)
        } employees of ${totalItems} employees`}
      </div>
      <ul className={style.pagination}>
        {isFirstPage || totalItems === 0 ? (
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
        {pageNumbers.map((number: number) => (
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
          {isLastPage || totalItems === 0 ? (
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
