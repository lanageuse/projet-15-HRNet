import { create } from "zustand";
import type { PaginationState } from "@types";

/**
 * Store Zustand pour la gestion de la pagination.
 * 
 * Fournit l'état global de la pagination et les actions pour la manipuler :
 * - currentPage : page actuellement affichée (par défaut 1)
 * - itemsPerPage : nombre d'éléments par page (par défaut 10)
 * - setCurrentPage : définit la page courante
 * - setItemsPerPage : définit le nombre d'éléments par page
 * 
 * @returns {PaginationState} L'état et les actions pour gérer la pagination
 */
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
