/**
 * Données initiales du formulaire contenant les champs vides.
 */
export const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  birthday: "",
  startDate: "",
  street: "",
  city: "",
  state: "",
  zipCode: 0,
  department: "",
};

/**
 * Message d'erreur des champs du formulaire.
 */
export const ERROR_FORM_MESSAGE = {
  firstName : "First name must be at least 3 characters long",
  lastName : "Last name must be at least 3 characters long",
  birthday : "Invalid date",
  startDate : "Invalid date",
  street : "Street must be at least 3 characters long",
  city : "City must be at least 3 characters long",
  state : "Invalid option : expected one of list",
  zipCode : "Zip code must be at least 3 characters long",
  department : "Invalid option : expected one of list",
}
