import { useDataTable } from "../dataTable/hooks/useDataTable";
import { DropDown } from "../dropdown/Dropdown";

const ITEM_PER_PAGE = [
  { id: "0", value: "10" },
  { id: "1", value: "15" },
  { id: "2", value: "20" },
  { id: "3", value: "25" },
  { id: "4", value: "30" },
];

export const ShowItem = () => {
  const { setItemsPerPage, itemsPerPage } = useDataTable();
  return (
    <DropDown
      name="itemPerpage"
      id="itemPerpage"
      title="Item per page"
      data={ITEM_PER_PAGE}
      selectedId={
        ITEM_PER_PAGE.find((item) => Number(item.value) === itemsPerPage)?.id ?? ""
      }
      onSelect={(e) => setItemsPerPage(Number(e.value))}
    />
  );
};
