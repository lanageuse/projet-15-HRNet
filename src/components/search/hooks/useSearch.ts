import { useCallback, useMemo, useState } from "react";
import { usePagination } from "../../pagination/hooks/usePagination";
import type { Employee } from "../../../types/types";

interface useSearchProps {
  items: Employee[];
}

interface useSearchReturn {
  searchTerm: string;
  filteredItems: Employee[];
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetSearch: () => void;
}

export const useSearch = ({ items }: useSearchProps): useSearchReturn => {
  // État local du composant
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * Filtre la liste des employés selon le terme de recherche
   * Utilise useMemo pour optimiser les performances en évitant le recalcul
   * si les dépendances (employees, searchTerm) n'ont pas changé.
   *
   * @returns {Employee[]} Liste des employés selon le terme de recherche
   */

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm, items]
  );

  const { setCurrentPage } = usePagination({
    totalItems: filteredItems.length,
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    setCurrentPage(1);
  }, [setSearchTerm]);

  const handleResetSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  return {
    searchTerm,
    filteredItems,
    handleSearch,
    handleResetSearch,
  };
};
