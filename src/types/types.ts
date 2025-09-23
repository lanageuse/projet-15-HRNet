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
  addEmployee: (formData: Employee) => void;
}

export interface DropDownItems {
  id: string;
  name: string;
}

export interface DropDownOptions {
  name: string;
  id: string;
  title?: string;
  data: DropDownItems[];
  selectId?: string;
  selectedId: string;
  onSelect: (item: DropDownItems) => void;
}
