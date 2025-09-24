import { createContext, useCallback, useState } from "react";
import { useEmployeeStore } from "../../../store/employeeStore";
import type { PaginationContextType, ThemeProviderProps } from "../../../types/types";
import { INITIAL_FORM_DATA } from "../../../constants";

/**
 * Contexte React pour la gestion de la pagination des employés
 * Fournit toutes les données et fonctions nécessaires à la pagination
 */
export const PaginationContext = createContext<PaginationContextType | null>(null);

/**
 * Composant Provider pour le contexte de pagination
 * Gère l'état de la pagination et calcule automatiquement les données nécessaires
 * @param children - Les composants enfants qui auront accès au contexte
 */
export const PaginationProvider = ({ children }: ThemeProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const employees = useEmployeeStore((state) => state.employees);
  const totalEmployees = employees.length;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const isLastPage =
    Math.ceil(totalEmployees / employeesPerPage) === currentPage;
  const isFirstPage = currentPage === 1;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  /**
   * Fonction pour naviguer vers une page spécifique
   * @param pageNumber - Numéro de la page à afficher
   * @param e - Événement de clic pour empêcher le comportement par défaut
   */
  const paginate = useCallback((pageNumber: number, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  }, [setCurrentPage])

  const theadItems = INITIAL_FORM_DATA
  
  return (
    <PaginationContext.Provider
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
        theadItems
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
