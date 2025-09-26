import { createContext } from "react";
import type {
  DataTableContextType,
  ThemeProviderProps,
} from "../../../types/types";
import { INITIAL_FORM_DATA } from "../../../constants";
import { usePagination } from "../../pagination/hooks/usePagination";
import { useSearch } from "../../search/hooks/useSearch";
import { useSort } from "../../tableHead/hooks/useSort";
import { useEmployeeStore } from "../../../store/employeeStore";

/**
 * Contexte React pour la gestion du DataTable
 */
export const DataTableContext = createContext<DataTableContextType | null>(
  null
);

/**
 * Composant Provider pour le contexte DataTable
 * Gère l'état global du tableau de données incluant :
 * - La pagination et la navigation entre les pages
 * - Le calcul automatique des données paginées
 * - La configuration des colonnes du tableau
 * @param children - Les composants enfants qui auront accès au contexte
 */
export const DataTableProvider = ({ children }: ThemeProviderProps) => {
  // Données Inital le nom des colonnes pour le header du tableau
  const theadItems = INITIAL_FORM_DATA;

  // Données du store
  const items = useEmployeeStore((state) => state.employees)

  const { searchTerm, handleSearch, filteredItems, handleResetSearch } =
    useSearch({items});
  const totalItems = filteredItems.length
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isLastPage,
    isFirstPage,
    indexOfLastItem,
    indexOfFirstItem,
    pageNumbers,
    paginate,
  } = usePagination({totalItems});


  const { handleSort, sortedItems, sortBy, sortOrder } = useSort({filteredItems});

    // Slice sur le tableau pour n'afficher que les employés de la page courant
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        isLastPage,
        isFirstPage,
        indexOfLastItem,
        indexOfFirstItem,
        currentItems,
        pageNumbers,
        paginate,
        theadItems,
        handleSort,
        sortedItems,
        sortBy,
        sortOrder,
        searchTerm,
        handleSearch,
        handleResetSearch,
        totalItems
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
