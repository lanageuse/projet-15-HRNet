import { useCallback } from "react";
import type { DropDownItems } from "@types";
import { DropDown } from "@components";
import { usePaginationStore } from "@store";
import { ITEM_PER_PAGE } from "@constants/pagination";

export const ItemsPerPage = () => {
  const setItemsPerPage = usePaginationStore((state) => state.setItemsPerPage);
  const itemsPerPage = usePaginationStore((state) => state.itemsPerPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);

  const handleChangeItemsPerPage = useCallback(
    (e: DropDownItems) => {
      setItemsPerPage(Number(e.value));
      setCurrentPage(1);
    },
    [setItemsPerPage]
  );

  return (
    <DropDown
      name="itemPerpage"
      id="itemPerpage"
      title="Item per page"
      data={ITEM_PER_PAGE}
      selectedId={
        ITEM_PER_PAGE.find((item) => Number(item.value) === itemsPerPage)?.id ??
        ""
      }
      onSelect={handleChangeItemsPerPage}
      closeOnSelect={true}
    />
  );
};
