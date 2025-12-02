import { usePaginationStore } from "@store";
import { useDataTable } from "../../dataTable/hooks/useDataTable";

/**
 * Hook personnalisé pour la gestion de la pagination.
 * Combine les données du tableau avec l'état de pagination pour calculer
 * les indices, pages et états de navigation.
 * 
 * @returns {Object} Objet contenant tous les états et données de pagination
 * @returns {number} currentPage - Page courante
 * @returns {Function} setCurrentPage - Fonction pour changer de page
 * @returns {number} itemsPerPage - Nombre d'éléments par page
 * @returns {Employee[]} items - Liste complète des employés
 * @returns {Employee[]} filteredItems - Liste filtrée des employés
 * @returns {string} searchTerm - Terme de recherche actuel
 * @returns {number} totalItems - Nombre total d'éléments filtrés
 * @returns {number} totalPages - Nombre total de pages
 * @returns {boolean} isLastPage - Indique si on est sur la dernière page
 * @returns {boolean} isFirstPage - Indique si on est sur la première page
 * @returns {number[]} pageNumbers - Tableau des numéros de pages
 * @returns {number} indexOfLastItem - Index du dernier élément de la page
 * @returns {number} indexOfFirstItem - Index du premier élément de la page
 */
export const usePagination = () => {
  const { totalItems, items, filteredItems, searchTerm } = useDataTable();
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const itemsPerPage = usePaginationStore((state) => state.itemsPerPage);

  // Calculs simples - pas besoin de mémoïsation
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const isLastPage = totalPages === currentPage;
  const isFirstPage = currentPage === 1;

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    items,
    searchTerm,
    filteredItems,
    totalItems,
    totalPages,
    isLastPage,
    isFirstPage,
    pageNumbers,
    indexOfLastItem,
    indexOfFirstItem,
  };
};