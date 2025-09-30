/**
 * Interface représentant un élément de liste déroulante.
 * Structure de base pour les options sélectionnables.
 */
export interface DropDownItems {
  id: string;
  value: string;
}

/**
 * Interface définissant les propriétés d'un composant dropdown.
 * Configure le comportement et l'apparence de la liste déroulante.
 */
export interface DropDownOptions {
  name: string;
  id: string;
  title?: string;
  data: DropDownItems[];
  selectId?: string;
  selectedId: string;
  onSelect: (item: DropDownItems) => void;
  closeOnSelect ?: boolean;
}