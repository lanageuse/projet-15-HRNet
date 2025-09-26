import { useCallback, useMemo, useState } from "react";
import type { Employee } from "../../../types/types";

interface UseSortProps {
  filteredItems: Employee[];
}

interface UseSortReturn {
  sortBy: keyof Employee;
  sortOrder: "asc" | "desc";
  sortedItems: Employee[];
  handleSort: (item: keyof Employee) => void;
}

export const useSort = ({filteredItems}: UseSortProps): UseSortReturn => {
  // État local du composant
  const [sortBy, setSortBy] = useState<keyof Employee>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /**
   * Fonction pour initialiser l'ordre d'affichage des employées en fonction de la colonne sélectionné
   * @param item - Nom de la colonne pour initialiser le tri
   */

  const handleSort = useCallback(
    (item: keyof Employee) => {
      if (sortBy === item) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortBy(item);
        setSortOrder("asc");
      }
    },
    [sortBy, sortOrder]
  );

  /**
   * Trie la liste des employés selon la colonne et l'ordre spécifiés.
   * Utilise useMemo pour optimiser les performances en évitant le recalcul
   * si les dépendances (filteredItems, sortBy, sortOrder) n'ont pas changé.
   *
   * @returns {Employee[]} Liste triée des employés selon les critères de tri
   */

  const sortedItems = useMemo(
    () =>
      [...filteredItems].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
      }),
    [filteredItems, sortOrder, sortBy]
  );

  return {
    sortBy,
    sortOrder,
    handleSort,
    sortedItems,
  };
};
