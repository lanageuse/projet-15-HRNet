import { useEmployeeStore } from "../../store/employeeStore";
import style from "./Form.module.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type EmployeeData } from "./formvalidation";
import { DropDown } from "../dropdown/Dropdown";
import { INITIAL_DEPARTEMENT_DATA, INITIAL_STATE_DATA } from "../../constants";
import { useCallback } from "react";

/**
 * Composant formulaire pour créer un nouvel employé.
 * Gère la saisie des informations personnelles, de l'adresse et du département.
 * Utilise le store d'employés pour ajouter l'employé lors de la soumission.
 */

export default function EmployeeForm() {
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

  return (
    <div className={style.formContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-labelledby="employee-form-title"
      >
        <h3 id="employee-form-title" className="mt-2 mb-4">
          Employee Information
        </h3>
        <div className={style.formGrid}>
          {/* First Name */}
          <label htmlFor="first-name">
            First Name
            <input
              {...register("firstName")}
              name="firstName"
              type="text"
              id="first-name"
              aria-required="true"
            />
            {errors.firstName && (
              <p className={style.formError} role="alert">
                {errors.firstName.message}
              </p>
            )}
          </label>

          {/* Last Name */}
          <label htmlFor="last-name">
            Last Name
            <input
              {...register("lastName")}
              name="lastName"
              type="text"
              id="last-name"
              aria-required="true"
            />
            {errors.lastName && (
              <p className={style.formError} role="alert">
                {errors.lastName.message}
              </p>
            )}
          </label>
          {/* Date of Birth */}
          <label htmlFor="date-of-birth">
            Date of Birth
            <input
              {...register("birthday")}
              name="birthday"
              id="date-of-birth"
              type="date"
              placeholder="MM/DD/YYYY"
              aria-describedby="date-of-birth-desc"
            />
            <small id="date-of-birth-desc">Format: MM/DD/YYYY</small>
            {errors.birthday && (
              <p className={style.formError} role="alert">
                {errors.birthday.message}
              </p>
            )}
          </label>

          {/* Start Date */}
          <label htmlFor="start-date">
            Start Date
            <input
              {...register("startDate")}
              name="startDate"
              id="start-date"
              type="date"
              aria-describedby="start-date-desc"
            />
            <small id="start-date-desc">Format: MM/DD/YYYY</small>
            {errors.startDate && (
              <p className={style.formError} role="alert">
                {errors.startDate.message}
              </p>
            )}
          </label>
          {/* Address */}
          <fieldset className={style.fieldset}>
            <legend>Address</legend>
            <label htmlFor="street">
              Street
              <input
                {...register("street")}
                name="street"
                id="street"
                type="text"
              />
              {errors.street && (
                <p className={style.formError} role="alert">
                  {errors.street.message}
                </p>
              )}
            </label>
            <label htmlFor="city">
              City
              <input {...register("city")} name="city" id="city" type="text" />
              {errors.city && (
                <p className={style.formError} role="alert">
                  {errors.city.message}
                </p>
              )}
            </label>
            <label htmlFor="state">
              State
              <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <DropDown
                  name="state"
                  id="state"
                  title="--- Choose state ---"
                  data={INITIAL_STATE_DATA}
                  selectedId={
                    INITIAL_STATE_DATA.find(
                      (item) => item.value === field.value
                    )?.id ?? ""
                  }
                  onSelect={(item) => {
                    field.onChange(item.value);
                    trigger("state");
                  }}
                />
              )}
            />
            {errors.state && (
                <p className={style.formError} role="alert">
                  {errors.state.message}
                </p>
              )}
            </label>

            <label htmlFor="zip-code">
              Zip Code
              <input
                {...register("zipCode", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
                name="zipCode"
                id="zip-code"
                type="number"
                inputMode="numeric"
                aria-required="true"
              />
              {errors.zipCode && (
                <p className={style.formError} role="alert">
                  {errors.zipCode.message}
                </p>
              )}
            </label>
          </fieldset>

          {/* Department */}
          <label htmlFor="department">
            Department
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <DropDown
                  name="department"
                  id="department"
                  title="--- Choose Department ---"
                  data={INITIAL_DEPARTEMENT_DATA}
                  selectedId={
                    INITIAL_DEPARTEMENT_DATA.find(
                      (item) => item.value === field.value
                    )?.id ?? ""
                  }
                  onSelect={(item) => {
                    field.onChange(item.value);
                    trigger("department");
                  }}
                />
              )}
            />
            {errors.department && (
              <p className={style.formError} role="alert">
                {errors.department.message}
              </p>
            )}
          </label>
        </div>
        <div className={style.formBtn}>
          <button
            type="button"
            aria-label="Cancel form"
            className="button my-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            aria-label="Submit form"
            className="button button--primary my-4"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
