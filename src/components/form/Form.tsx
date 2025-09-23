import { useEmployeeStore } from "../../store/employeeStore";
import style from "./Form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type EmployeeData } from "./formvalidation";

/**
 * Composant formulaire pour créer un nouvel employé.
 * Gère la saisie des informations personnelles, de l'adresse et du département.
 * Utilise le store d'employés pour ajouter l'employé lors de la soumission.
 */

export default function EmployeeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeData>({
    resolver: zodResolver(formSchema),
  });

  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const onSubmit = (data: EmployeeData) => {
    addEmployee(data);
    reset();
  };

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
              <p className={style.formError}>{errors.firstName.message}</p>
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
              <p className={style.formError}>{errors.lastName.message}</p>
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
              <p className={style.formError}>{errors.birthday.message}</p>
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
              <p className={style.formError}>{errors.startDate.message}</p>
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
                <p className={style.formError}>{errors.street.message}</p>
              )}
            </label>
            <label htmlFor="city">
              City
              <input {...register("city")} name="city" id="city" type="text" />
              {errors.city && (
                <p className={style.formError}>{errors.city.message}</p>
              )}
            </label>
            <label htmlFor="state">
              State
              <select {...register("state")} id="state" aria-required="true">
                <option value="">
                  --- Choose State ---
                </option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
              </select>
              {errors.state && (
                <p className={style.formError}>{errors.state.message}</p>
              )}
            </label>

            <label htmlFor="zip-code">
              Zip Code
              <input
                {...register("zipCode", {
                  setValueAs: (value) => value === "" ? undefined : Number(value) ,
                })}
                name="zipCode"
                id="zip-code"
                type="number"
                inputMode="numeric"
                aria-required="true"
              />
              {errors.zipCode && (
                <p className={style.formError}>{errors.zipCode.message}</p>
              )}
            </label>
          </fieldset>

          {/* Department */}
          <label htmlFor="department">
            Department
            <select
              {...register("department")}
              id="department"
              aria-required="true"
            >
              <option value="">
                --- Choose Department ---
              </option>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
            {errors.department && (
              <p className={style.formError}>{errors.department.message}</p>
            )}
          </label>
        </div>
        <div className={style.formBtn}>
          <button
            type="button"
            aria-label="Cancel form"
            className="button my-4"
            onClick={() => reset()}
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
