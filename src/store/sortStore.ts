import { create } from "zustand";
import type { Employee } from "@types";
import { useEmployeeStore } from "./employeeStore";

/**
 * Interface définissant l'état et les actions du store de tri.
 */
interface UseSortState {
  /** Colonne actuellement utilisée pour le tri */
  sortBy: keyof Employee;
  /** Fonction pour définir la colonne de tri */
  setSortBy: (newSortBy: keyof Employee) => void;
  /** Ordre de tri actuel (croissant ou décroissant) */
  sortOrder: "asc" | "desc";
  /** Fonction pour basculer l'ordre de tri */
  setSortOrder: (order: string) => void;
  /** Fonction pour gérer le tri d'une colonne */
  handleSort: (item: keyof Employee) => void;
}

/**
 * Store Zustand pour la gestion du tri des employés.
 * 
 * Fournit l'état global du tri et les actions pour le manipuler :
 * - sortBy : colonne actuellement utilisée pour le tri (par défaut "firstName")
 * - sortOrder : ordre de tri actuel ("asc" ou "desc")
 * - setSortBy : définit la colonne de tri
 * - setSortOrder : bascule l'ordre de tri
 * - handleSort : gère le tri d'une colonne
 * 
 * @returns {UseSortState} L'état et les actions pour gérer le tri
 */
export const useSortStore = create<UseSortState>()((set, get) => ({
  sortBy: "firstName",
  setSortBy: (newSortBy) => set({ sortBy: newSortBy }),
  sortOrder: "asc",
  setSortOrder: () =>
    set({ sortOrder: get().sortOrder === "asc" ? "desc" : "asc" }),
  /**
   * Gère le tri d'une colonne.
   * Si la colonne est déjà sélectionnée, inverse l'ordre de tri.
   * Sinon, sélectionne la nouvelle colonne avec un tri croissant.
   * @param item - Nom de la colonne pour initialiser le tri
   */
  handleSort: (item: keyof Employee) => {
    const { sortBy, setSortBy, sortOrder, setSortOrder } = get();
    if (sortBy === item) {
      // Même colonne : inverse l'ordre
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Nouvelle colonne : tri croissant par défaut
      setSortBy(item);
      setSortOrder("asc");
    }
  },
}));

/**
 * Trie la liste des employés selon la colonne et l'ordre spécifiés.
 * Récupère les données depuis les stores et applique le tri en créant une nouvelle copie du tableau.
 * 
 * @returns {Employee[]} Liste triée des employés selon les critères de tri actuels
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
