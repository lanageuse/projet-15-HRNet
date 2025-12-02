import { getFilteredItems, useSearchStore } from "@store";
import { getSortedItems } from "@store";

/**
 * Hook personnalisé pour la gestion des données du tableau.
 * Combine le tri et le filtrage des employés en une seule interface.
 * Fournit les données triées et filtrées prêtes à être affichées.
 * 
 * @returns {Object} Objet contenant les données du tableau
 * @returns {Employee[]} items - Liste des employés triés
 * @returns {string} searchTerm - Terme de recherche actuel
 * @returns {Employee[]} filteredItems - Liste des employés triés et filtrés
 * @returns {number} totalItems - Nombre total d'éléments après filtrage
 */
export const useDataTable = () => {
  const items = getSortedItems();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const filteredItems = getFilteredItems({ items, searchTerm });
  const totalItems = filteredItems.length;
  return {
    items,
    searchTerm,
    filteredItems,
    totalItems,
  };
};
