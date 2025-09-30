import { create } from "zustand";
import type { Employee } from "@types";
import { useEmployeeStore } from "./employeeStore";

interface UseSortState {
  sortBy: keyof Employee;
  setSortBy: (newSortBy: keyof Employee) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: string) => void;
  handleSort: (item: keyof Employee) => void;
}

export const useSortStore = create<UseSortState>()((set, get) => ({
  sortBy: "firstName",
  setSortBy: (newSortBy) => set({ sortBy: newSortBy }),
  sortOrder: "asc",
  setSortOrder: () =>
    set({ sortOrder: get().sortOrder === "asc" ? "desc" : "asc" }),
  /**
   * Fonction pour initialiser l'ordre d'affichage des employées en fonction de la colonne sélectionné
   * @param item - Nom de la colonne pour initialiser le tri
   */
  handleSort: (item: keyof Employee) => {
    const { sortBy, setSortBy, sortOrder, setSortOrder } = get();
    if (sortBy === item) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(item);
      setSortOrder("asc");
    }
  },
}));

/**
 * Trie la liste des employés selon la colonne et l'ordre spécifiés.
 * @returns {Employee[]} Liste triée des employés selon les critères de tri
 */

export const getSortedItems = () => {
  const items = useEmployeeStore(state => state.employees)
  const sortBy = useSortStore((state) => state.sortBy);
  const sortOrder = useSortStore((state) => state.sortOrder);
  return [...items].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });
};
