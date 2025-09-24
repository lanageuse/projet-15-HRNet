import { useContext } from "react";
import { DataTableContext } from "../context/PaginationContext";

/**
 * Hook personnalisé pour accéder au contexte de DataTable
 * Fournit toutes les données et fonctions nécessaires à la DataTable
 * @returns {DataTableContextType} Objet contenant l'état et les fonctions de DataTable
 * @throws {Error} Si utilisé en dehors du DataTableContext
 */
export const useDataTable = () => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("useDatable must be used within a DataTableContext");
  }
  return context;
};
