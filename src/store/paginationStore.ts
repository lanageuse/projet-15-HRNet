import { create } from "zustand";

interface PaginationState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (n: number) => void;
}

export const usePaginationStore = create<PaginationState>()((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => {
    set({ currentPage: page });
  },
  itemsPerPage: 10,
  setItemsPerPage: (n) => {
    set({ itemsPerPage: n });
  }
}));
