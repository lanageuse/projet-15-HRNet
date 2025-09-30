import { create } from "zustand";
import type { PaginationState } from "@types";

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
