import { create } from "zustand";
import type { EmployeeAction, EmployeeState } from "@types";
import { persist } from "zustand/middleware";

/**
 * Store Zustand pour la gestion des employés avec persistance.
 *
 * Fournit l'état global des employés et les actions pour les manipuler :
 * - employees : tableau contenant tous les employés
 * - addEmployee : ajoute un nouvel employé à la liste existante
 * - addMockEmployee : ajoute des employés de test en lot
 * - reset : remet le store à son état initial
 * 
 * Utilise persist pour sauvegarder les données dans le localStorage.
 *
 * @returns {EmployeeState & EmployeeAction} L'état et les actions pour gérer les employés
 */
export const useEmployeeStore = create<EmployeeState & EmployeeAction>()(
  persist(
    (set, get, store) => ({
      employees: [],
      /**
       * Ajoute un nouvel employé à la liste existante.
       * Crée une nouvelle copie du tableau pour maintenir l'immutabilité.
       */
      addEmployee: (formData) => {
        set({ employees: [...get().employees, formData] });
      },
      /**
       * Ajoute plusieurs employés de test en une seule fois.
       * Utile pour le développement et les tests.
       */
      addMockEmployee: (mockData) =>
        set({ employees: [...get().employees, ...mockData] }),
      /**
       * Remet le store à son état initial (liste vide).
       */
      reset: () => {
        set(store.getInitialState());
      },
    }),
    {
      name: "employees-storage", // Nom unique pour le stockage localStorage
    }
  )
);
