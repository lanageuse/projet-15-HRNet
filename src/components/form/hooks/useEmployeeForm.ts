import { useEmployeeStore } from "@store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type EmployeeData } from "../formvalidation";
import { useModal } from "@liron-0654/react-lib-modal";
import "@liron-0654/react-lib-modal/style.css";

/**
 * Hook personnalisé pour la gestion du formulaire d'employé.
 * Intègre React Hook Form avec validation Zod, gestion du store et modal de confirmation.
 *
 * @returns {Object} Objet contenant les méthodes et états du formulaire
 * @returns {Function} onSubmit - Fonction de soumission du formulaire
 * @returns {Function} handleCancel - Fonction d'annulation/reset du formulaire
 * @returns {Object} register - Fonction d'enregistrement des champs React Hook Form
 * @returns {Object} control - Contrôleur pour les champs personnalisés
 * @returns {Function} handleSubmit - Gestionnaire de soumission React Hook Form
 * @returns {Function} trigger - Fonction de déclenchement de validation
 * @returns {Object} errors - Erreurs de validation du formulaire
 * @returns {Object} modal - Utilitaires de gestion de la modal
 */
export const useEmployeeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<EmployeeData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const modal = useModal();

  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const onSubmit = (data: EmployeeData) => {
      addEmployee(data);
      reset();
      // Ouvrir la modal avec un message de succès
      modal.openModal({
        content: "Employee added!",
        size: "small",
        position: "center",
      });
  };

  const handleCancel = () => {
    reset();
  };

  return {
    onSubmit,
    handleCancel,
    register,
    control,
    handleSubmit,
    trigger,
    errors,
    modal,
  };
};
