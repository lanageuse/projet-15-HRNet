/**
 * Type représentant le state de la pagination
 */

export interface PaginationState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (n: number) => void;
}
