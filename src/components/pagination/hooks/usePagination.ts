import { usePaginationStore } from "../../../store/paginationStore";
import { useDataTable } from "../../dataTable/useDatatable.ts/useDataTable";

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