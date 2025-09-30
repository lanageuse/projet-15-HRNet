import { useEmployeeStore } from "@store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type EmployeeData } from "../formvalidation";
import { useCallback } from "react";

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

  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const onSubmit = useCallback(
    (data: EmployeeData) => {
      try {
        addEmployee(data);
        reset();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [reset, addEmployee]
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
  };
};
