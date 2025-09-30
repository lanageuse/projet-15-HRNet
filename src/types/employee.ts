/**
 * Type représentant un employé avec ses informations
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
