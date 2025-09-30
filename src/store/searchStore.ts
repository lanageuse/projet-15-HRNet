import { create } from "zustand";
import { usePaginationStore } from "./paginationStore";
import type { Employee } from "@types";

interface useSearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetSearch: () => void;
}

export const useSearchStore = create<useSearchState>()((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    set({ searchTerm: newTerm });
    usePaginationStore.getState().setCurrentPage(1);
  },
  handleResetSearch: () => {
    set({ searchTerm: "" });
  },
}));

/**
 * Filtre la liste des employés selon le terme de recherche
 * Utilise useMemo pour optimiser les performances en évitant le recalcul
 * si les dépendances (employees, searchTerm) n'ont pas changé.
 *
 * @returns {Employee[]} Liste des employés selon le terme de recherche
 */

interface getFilteredItemsProps{
  items : Employee[]
  searchTerm : string
}
export const getFilteredItems  = ({items, searchTerm} : getFilteredItemsProps ) => {
  if (!searchTerm.trim()) {
    return items;
  }
  return [...items].filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};
