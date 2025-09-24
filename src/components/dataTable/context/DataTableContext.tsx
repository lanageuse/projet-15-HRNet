import { createContext, useCallback, useMemo, useState } from "react";
import { useEmployeeStore } from "../../../store/employeeStore";
import type {
  DataTableContextType,
  Employee,
  ThemeProviderProps,
} from "../../../types/types";
import { INITIAL_FORM_DATA } from "../../../constants";

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
  // État local du composant
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [employeesPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<keyof Employee>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Données du store
  const employees = useEmployeeStore((state) => state.employees);
  
  // Données Inital utliser pour le Thead du tableau
  const theadItems = INITIAL_FORM_DATA;

  // Calculs de pagination
  const totalEmployees = employees.length;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const isLastPage =
    Math.ceil(totalEmployees / employeesPerPage) === currentPage;
  const isFirstPage = currentPage === 1;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Données à afficher 
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

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
    [setSortBy, setSortOrder, sortBy, sortOrder]
  );
  
  /**
   * Trie la liste des employés selon la colonne et l'ordre spécifiés.
   * Utilise useMemo pour optimiser les performances en évitant le recalcul
   * si les dépendances (currentEmployees, sortBy, sortOrder) n'ont pas changé.
   *
   * @returns {Employee[]} Liste triée des employés selon les critères de tri
   */

  const sortedEmployees = useMemo(
    () =>
      [...currentEmployees].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
      }),
    [currentEmployees, sortOrder, sortBy]
  );

  /**
   * Fonction pour naviguer vers une page spécifique
   * @param pageNumber - Numéro de la page à afficher
   * @param e - Événement de clic pour empêcher le comportement par défaut
   */
  const paginate = useCallback(
    (pageNumber: number, e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setCurrentPage(pageNumber);
    },
    [setCurrentPage]
  );

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        employeesPerPage,
        isLastPage,
        isFirstPage,
        totalEmployees,
        indexOfLastEmployee,
        indexOfFirstEmployee,
        currentEmployees,
        pageNumbers,
        paginate,
        theadItems,
        handleSort,
        sortedEmployees,
        sortBy,
        sortOrder,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
