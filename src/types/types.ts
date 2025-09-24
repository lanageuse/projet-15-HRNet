import type { ReactElement } from "react";

/**
 * Type représentant un employé avec ses informations personnelles et professionnelles.
 * Contient les données de base
 */
export type Employee = {
  firstName: string;
  lastName: string;
  birthday: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  department: string;
};

/**
 * Interface définissant l'état de gestion des employés.
 * Fournit la liste des employés et la fonction pour ajouter un nouvel employé.
 */
export interface EmployeeState {
  employees: Employee[];
}
/**
 * Interface définissant les actions disponibles pour la gestion des employ��s.
 * Permet d'ajouter, importer des employés et de réinitialiser la liste.
 */
export interface EmployeeAction {
  addEmployee: (formData: Employee) => void;
  addMockEmployee: (data: Employee[]) => void;
  reset: () => void;
}

/**
 * Interface représentant un élément de liste déroulante.
 * Structure de base pour les options sélectionnables.
 */
export interface DropDownItems {
  id: string;
  name: string;
}

/**
 * Interface définissant les propriétés d'un composant dropdown.
 * Configure le comportement et l'apparence de la liste déroulante.
 */
export interface DropDownOptions {
  name: string;
  id: string;
  title?: string;
  data: DropDownItems[];
  selectId?: string;
  selectedId: string;
  onSelect: (item: DropDownItems) => void;
}

/**
 * Interface du contexte de pagination pour la gestion de l'affichage des employés.
 * Fournit toutes les données et fonctions nécessaires à la pagination.
 */
export interface DataTableContextType {
  employeesPerPage : number
  totalEmployees : number
  pageNumbers : number[]
  setCurrentPage : (pageNumber : number) => void
  indexOfLastEmployee : number
  indexOfFirstEmployee : number
  currentEmployees : Employee[]
  paginate : (pageNumber: number,  e: React.MouseEvent<HTMLElement>) => void
  currentPage : number
  isLastPage :boolean
  isFirstPage :boolean
  theadItems : Employee
}


/**
 * Props pour le composant PaginationProvider
 */
export type ThemeProviderProps = {
  children: ReactElement;
};