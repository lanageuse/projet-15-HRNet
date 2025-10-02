import { useEmployeeStore } from "@store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { formSchema, type EmployeeData } from "../formvalidation";
import { useModal } from "@liron-0654/react-lib-modal";
import '@liron-0654/react-lib-modal/style.css'

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
  const onSubmit = useCallback(
    (data: EmployeeData) => {
      try {
        addEmployee(data);
        reset();
        // Ouvrir la modal avec un message de succès
        modal.openModal({
          content: "Employee added!",
          size: "small",
          position: "center"
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [reset, addEmployee, modal]
  );

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return {
    onSubmit,
    addEmployee,
    handleCancel,
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    errors,
    modal
  };
};
