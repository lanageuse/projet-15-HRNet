import z from "zod";

/**
 * Schéma de validation Zod pour les données d'employé incluant les informations personnelles et d'adresse.
 * Définit les règles de validation pour les champs obligatoires avec des longueurs minimales.
 */
const department = ["Sales", "Marketing", "Engineering", "Human Resources",
"Legal"] as const;
export const formSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  birthday: z.iso.date({message : "Invalid date"}),
  startDate: z.iso.date({message : "Invalid date"}),
  street: z.string().min(3, "Street must be at least 3 characters long"),
  city: z.string().min(3, "City must be at least 3 characters long"),
  state: z.enum(department, "Invalid option : expected one of list"),
  zipCode: z
    .number().min(6, "Zip code must be at least 3 characters long"),
  department: z.enum(department, "Invalid option : expected one of list"),
});

export type EmployeeData = z.infer<typeof formSchema>;