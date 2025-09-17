import { create } from "zustand";
import type { EmployeeState } from "../types/types";

/**
 * Store Zustand pour la gestion des employés.
 * 
 * Fournit l'état global des employés et les actions pour les manipuler :
 * - employees : tableau contenant tous les employés
 * - addEmployee : ajoute un nouvel employé à la liste existante
 * 
 * @returns {EmployeeState} L'état et les actions pour gérer les employés
 */

export const useEmployeeStore = create<EmployeeState>()(
  (set) => ({
    employees: [],
    addEmployee: (formData) => set((state) => ({...state, employees: [...state.employees, formData]}))
  }),
);