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
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortBy, setSortBy] = useState<keyof Employee>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Données du store
  const employees = useEmployeeStore((state) => state.employees);

  // Données Inital le nom des colonnes pour le header du tableau
  const theadItems = INITIAL_FORM_DATA;

  /**
   * Filtre la liste des employés selon le terme de recherche
   * Utilise useMemo pour optimiser les performances en évitant le recalcul
   * si les dépendances (employees, searchTerm) n'ont pas changé.
   *
   * @returns {Employee[]} Liste des employés selon le terme de recherche
   */
  const filteredEmployees = useMemo(
    () =>
      employees.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm, employees]
  );

  // Calculs de pagination
  const totalEmployees = filteredEmployees.length;
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const isLastPage =
    Math.ceil(totalEmployees / itemsPerPage) === currentPage;
  const isFirstPage = currentPage === 1;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEmployees / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Slice sur le tableau pour n'afficher que les emplyés de la page courant
  const currentEmployees = filteredEmployees.slice(
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

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.currentTarget.value);
      setCurrentPage(1);
    },
    [setSearchTerm, setCurrentPage]
  );
    const handleResetSearch = useCallback(
    () => {
      setSearchTerm("");
    },
    [setSearchTerm, setCurrentPage]
  );

  return (
    <DataTableContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        itemsPerPage,
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
        searchTerm,
        handleSearch,
        handleResetSearch,
        setItemsPerPage
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
