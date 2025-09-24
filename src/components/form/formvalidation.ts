import z from "zod";
import { ERROR_FORM_MESSAGE, INITIAL_DEPARTEMENT_DATA, INITIAL_STATE_DATA } from "../../constants";

/**
 * Schéma de validation Zod pour les données d'employé incluant les informations personnelles et d'adresse.
 * Définit les règles de validation pour les champs obligatoires avec des longueurs minimales.
 */
const department = INITIAL_DEPARTEMENT_DATA.map((s) => s.value)
const state = INITIAL_STATE_DATA.map((s) => s.value)


export const formSchema = z.object({
  firstName: z.string().min(3, ERROR_FORM_MESSAGE.firstName),
  lastName: z.string().min(3, ERROR_FORM_MESSAGE.lastName),
  birthday: z.iso.date({message : ERROR_FORM_MESSAGE.birthday}),
  startDate: z.iso.date({message : ERROR_FORM_MESSAGE.startDate}),
  street: z.string().min(3, ERROR_FORM_MESSAGE.street),
  city: z.string().min(3, ERROR_FORM_MESSAGE.city),
  state: z.enum(state, ERROR_FORM_MESSAGE.state),
  zipCode: z.number().min(6, ERROR_FORM_MESSAGE.zipCode),
  department: z.enum(department, ERROR_FORM_MESSAGE.department),
});

export type EmployeeData = z.infer<typeof formSchema>;