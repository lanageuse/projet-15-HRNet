import { useCallback, useEffect, useState } from "react";
import type { DropDownItems, DropDownOptions } from "../../types/types";
import style from "./dropdown.module.css";
import { useOutsideClick } from "./hooks/useOutsideClick";

export const DropDown = ({
  name,
  id,
  title,
  data,
  selectedId,
  onSelect,
}: DropDownOptions) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItems | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );
  const ref = useOutsideClick(() => {
    setIsOpen(false)
  });

  const handleChange = useCallback(
    (item: DropDownItems) => {
      onSelect && onSelect(item);
    },
    [onSelect]
  );

  // Mise à jour de l'item sélectionné quand les données changent
  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  return (
    <div ref={ref} className={style?.dropDownContainer}>
      <button
        id={id}
        name={name}
        aria-label="Toggle dropdown"
        aria-haspopup="true"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={style?.dropDownBtn}
      >
        <span>{selectedItem?.value || title}</span>
        <span className={isOpen ? style.open : ""}> {"▾"} </span>
      </button>
      {isOpen && (
        <div aria-label="Dropdown menu" className="">
          <ul
            role="menu"
            aria-labelledby={id}
            aria-orientation="vertical"
            className={style?.dropDownList}
          >
            {data.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={`${style?.dropDownItem} ${
                  selectedItem?.id === item.id ? style.selected : ""
                }`}
              >
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
