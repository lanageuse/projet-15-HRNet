import { useCallback, useState } from "react";

interface usePaginationProps {
    totalItems : number
}
interface usePaginationReturn{
    currentPage : number
    setCurrentPage : (number : number) => void
    itemsPerPage : number
    setItemsPerPage :  (number : number) => void
    isLastPage : boolean
    isFirstPage : boolean
    totalItems : number
    indexOfLastItem : number
    indexOfFirstItem : number
    pageNumbers : number[]
    paginate : (pageNumber : number, e: React.MouseEvent<HTMLElement>) => void
}

export const usePagination = ({totalItems}:usePaginationProps) : usePaginationReturn => {
  // État local du composant
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  // Calculs de pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const isLastPage = totalPages === currentPage;
  const isFirstPage = currentPage === 1;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isLastPage,
    isFirstPage,
    totalItems,
    indexOfLastItem,
    indexOfFirstItem,
    pageNumbers,
    paginate,
  };
};
