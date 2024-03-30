import React, { useState, useEffect } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { defaultSettings } from "../../DefaultValues";

import { useI18n } from "../../store/i18n";

type TroopsInputProps = {
  whatField: FejkomatKeys;
  inputChangeHandler: (whatField: FejkomatKeys, value: string) => void;
};

const availableTroops = [
  "spear",
  "sword",
  "axe",
  "archer",
  "spy",
  "light",
  "marcher",
  "heavy",
  "ram",
  "catapult",
  "snob",
];

export const FillTroopsInput = ({
  whatField,
  inputChangeHandler,
}: TroopsInputProps) => {
  const { i18n } = useI18n();
  const defaultTroops = defaultSettings["fill_troops"]!.split(",");
  const [selectedTroops, setSelectedTroops] = useState<string[]>(defaultTroops);

  useEffect(() => {
    const updatedTroops = selectedTroops.join(",");
    inputChangeHandler(whatField, updatedTroops);
  }, [selectedTroops, whatField, inputChangeHandler]);

  const handleTroopClick = (troop: string) => {
    setSelectedTroops((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(troop);
      if (isAlreadySelected) {
        return prevSelected.filter((t) => t !== troop); // remove the troop if already selected
      } else {
        return [...prevSelected, troop]; // add the troop if not already selected
      }
    });
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg shadow">
      <div className="flex flex-col flex-grow">
        <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
        <div className="mb-2 w-full text-sm text-gray-500">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        {availableTroops.map((troop) => (
          <div
            key={troop}
            className={`p-2 m-1 cursor-pointer rounded-xl border ${
              selectedTroops.includes(troop)
                ? " bg-green-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTroopClick(troop)}
          >
            {i18n(troop)}
          </div>
        ))}
      </div>
    </div>
  );
};
