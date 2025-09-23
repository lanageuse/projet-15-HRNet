import { create } from "zustand";
import type { EmployeeAction, EmployeeState } from "../types/types";
import { persist } from "zustand/middleware";

/**
 * Store Zustand pour la gestion des employés.
 *
 * Fournit l'état global des employés et les actions pour les manipuler :
 * - employees : tableau contenant tous les employés
 * - addEmployee : ajoute un nouvel employé à la liste existante
 *
 * @returns {EmployeeState} L'état et les actions pour gérer les employés
 */

export const useEmployeeStore = create<EmployeeState & EmployeeAction>()(
  persist(
    (set, get, store) => ({
      employees: [],
      addEmployee: (formData) => {
        set({ employees: [...get().employees, formData] });
      },
      addMockEmployee: (mockData) =>
        set({ employees: [...get().employees, ...mockData] }),
      reset: () => {
        set(store.getInitialState());
      },
    }),
    {
      name: "employees-storage", // name of the item in the storage (must be unique)
    }
  )
);
