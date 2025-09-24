import { useContext } from "react";
import { PaginationContext } from "../context/PaginationContext";

/**
 * Hook personnalisé pour accéder au contexte de pagination
 * Fournit toutes les données et fonctions nécessaires à la pagination des employés
 * @returns {PaginationContextType} Objet contenant l'état et les fonctions de pagination
 * @throws {Error} Si utilisé en dehors d'un PaginationProvider
 */
export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
