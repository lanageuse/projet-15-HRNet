import { getFilteredItems, useSearchStore } from "../../../store/searchStore";
import { getSortedItems } from "../../../store/sortStore";

export const useDataTable = () => {
  const items = getSortedItems();
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const filteredItems = getFilteredItems({ items, searchTerm });
  const totalItems = filteredItems.length;
  return {
    items,
    searchTerm,
    filteredItems,
    totalItems,
  };
};
