import { useState, type ChangeEvent } from "react";
import { useEmployeeStore } from "../../store/employeeStore";
import { INITIAL_FORM_DATA } from "../../constants";
import style from "./Form.module.css";
/**
 * Composant formulaire pour créer un nouvel employé.
 * Gère la saisie des informations personnelles, de l'adresse et du département.
 * Utilise le store d'employés pour ajouter l'employé lors de la soumission.
 */
export default function EmployeeForm() {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const {
    firstName,
    lastName,
    birthday,
    startDate,
    street,
    city,
    state,
    zipCode,
    department,
  } = formData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addEmployee(formData);
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit} aria-labelledby="employee-form-title">
        <h3 id="employee-form-title" className="mt-2 mb-4">
          Employee Information
        </h3>
        <div className={style.formGrid}>
          {/* First Name */}
          <label htmlFor="first-name">
            First Name
            <input
              value={firstName}
              onChange={handleChange}
              name="firstName"
              type="text"
              id="first-name"
              aria-required="true"
            />
          </label>

          {/* Last Name */}
          <label htmlFor="last-name">
            Last Name
            <input
              value={lastName}
              onChange={handleChange}
              name="lastName"
              type="text"
              id="last-name"
              aria-required="true"
            />
          </label>
          {/* Date of Birth */}
          <label htmlFor="date-of-birth">
            Date of Birth
            <input
              value={birthday}
              onChange={handleChange}
              name="birthday"
              id="date-of-birth"
              type="text"
              placeholder="MM/DD/YYYY"
              aria-describedby="date-of-birth-desc"
            />
            <small id="date-of-birth-desc">Format: MM/DD/YYYY</small>
          </label>

          {/* Start Date */}
          <label htmlFor="start-date">
            Start Date
            <input
              value={startDate}
              onChange={handleChange}
              name="startDate"
              id="start-date"
              type="text"
              aria-describedby="start-date-desc"
            />
            <small id="start-date-desc">Format: MM/DD/YYYY</small>
          </label>
          {/* Address */}
          <fieldset className={style.fieldset}>
            <legend>Address</legend>
            <label htmlFor="street">
              Street
              <input
                value={street}
                onChange={handleChange}
                name="street"
                id="street"
                type="text"
              />
            </label>
            <label htmlFor="city">
              City
              <input
                value={city}
                onChange={handleChange}
                name="city"
                id="city"
                type="text"
              />
            </label>
            <label htmlFor="state">
              State
              <select
                name="state"
                value={state}
                id="state"
                onChange={handleChange}
                aria-required="true"
              ></select>
            </label>

            <label htmlFor="zip-code">
              Zip Code
              <input
                value={zipCode}
                onChange={handleChange}
                id="zip-code"
                type="number"
                inputMode="numeric"
                aria-required="true"
              />
            </label>
          </fieldset>

          {/* Department */}
          <label htmlFor="department">
            Department
            <select
              name="department"
              value={department}
              id="department"
              onChange={handleChange}
              aria-required="true"
            >
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
            </select>
          </label>
        </div>
        <div className={style.formBtn}>
          <button
            type="submit"
            aria-label="Submit form"
            className="button my-4"
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
