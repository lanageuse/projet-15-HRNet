import { useState, type ChangeEvent } from "react";
import { useEmployeeStore } from "../store/employeeStore";
import { INITIAL_FORM_DATA } from "../constants";

/**
 * Composant formulaire pour créer un nouvel employé.
 * Gère la saisie des informations personnelles, de l'adresse et du département.
 * Utilise le store d'employés pour ajouter l'employé lors de la soumission.
 */
export default function EmployeeForm() {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);  
  const {firstName,lastName,birthday,startDate,street,city,state,zipCode,department} = formData

  const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData(formData => ({...formData, [name] : value }))
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addEmployee(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first-name">First Name</label>
      <input value={firstName} onChange={handleChange} name="firstName" type="text" id="first-name" />

      <label htmlFor="last-name">Last Name</label>
      <input value={lastName} onChange={handleChange} name="lastName" type="text" id="last-name" />

      <label htmlFor="date-of-birth">Date of Birth</label>
      <input value={birthday}  onChange={handleChange} name="birthday" id="date-of-birth" type="text" />

      <label htmlFor="start-date">Start Date</label>
      <input value={startDate} onChange={handleChange} name="startDate" id="start-date" type="text" />

      <fieldset className="address">
        <legend>Address</legend>

        <label htmlFor="street">Street</label>
        <input value={street} onChange={handleChange} name="street" id="street" type="text" />

        <label htmlFor="city">City</label>
        <input value={city} onChange={handleChange} name="city" id="city" type="text" />

        <label htmlFor="state">State</label>
        <select name="state" id="state" onChange={handleChange}></select>

        <label htmlFor="zip-code">Zip Code</label>
        <input value={zipCode} onChange={handleChange} id="zip-code" type="number" />
      </fieldset>

      <label htmlFor="department">Department</label>
      <select name="department" id="department" onChange={handleChange}>
        <option>Sales</option>
        <option>Marketing</option>
        <option>Engineering</option>
        <option>Human Resources</option>
        <option>Legal</option>
      </select>
      <button type="submit">Send</button>
    </form>
  );
}
