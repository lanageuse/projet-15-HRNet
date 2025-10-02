import { create } from "zustand";
import { usePaginationStore } from "./paginationStore";
import type { Employee } from "@types";

/**
 * Interface définissant l'état et les actions du store de recherche.
 */
interface useSearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetSearch: () => void;
}

/**
 * Store Zustand pour la gestion de la recherche d'employés.
 * 
 * Fournit l'état global de la recherche et les actions pour la manipuler :
 * - searchTerm : terme de recherche actuel
 * - setSearchTerm : définit le terme de recherche
 * - handleSearch : gère la saisie de recherche et remet la pagination à la page 1
 * - handleResetSearch : remet à zéro le terme de recherche
 * 
 * @returns {useSearchState} L'état et les actions pour gérer la recherche
 */
export const useSearchStore = create<useSearchState>()((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  /**
   * Gère la saisie de recherche en temps réel.
   * Met à jour le terme de recherche et remet la pagination à la page 1.
   */
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    set({ searchTerm: newTerm });
    // Remet la pagination à la page 1 lors d'une nouvelle recherche
    usePaginationStore.getState().setCurrentPage(1);
  },
  handleResetSearch: () => {
    set({ searchTerm: "" });
  },
}));

/**
 * Interface pour les paramètres de la fonction getFilteredItems.
 */
interface getFilteredItemsProps {
  items: Employee[];
  searchTerm: string;
}

/**
 * Filtre la liste des employés selon le terme de recherche.
 * Effectue une recherche insensible à la casse sur toutes les propriétés des employés.
 * Si le terme de recherche est vide, retourne la liste complète.
 * 
 * @param {getFilteredItemsProps} params - Paramètres de filtrage
 * @returns {Employee[]} Liste des employés filtrés selon le terme de recherche
 */
export const getFilteredItems = ({ items, searchTerm }: getFilteredItemsProps) => {
  if (!searchTerm.trim()) {
    return items;
  }
  
  // Filtre en recherchant dans toutes les valeurs de chaque employé
  return [...items].filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
};
