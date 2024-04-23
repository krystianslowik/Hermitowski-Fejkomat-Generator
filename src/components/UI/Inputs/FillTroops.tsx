import React, { useState, useEffect } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { defaultSettings } from "../../DefaultValues";
import {
  troopIcons,
  troopIconsBlocked,
} from "../../../assets/icons/TroopsIcons";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTroops]);

  const handleTroopClick = (troop: string) => {
    setSelectedTroops((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(troop);
      if (isAlreadySelected) {
        return prevSelected.filter((t) => t !== troop);
      } else {
        return [...prevSelected, troop];
      }
    });
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg shadow ">
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
            className={` flex p-2 m-1 cursor-pointer rounded-xl border ${
              selectedTroops.includes(troop)
                ? " bg-stone-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTroopClick(troop)}
          >
            {selectedTroops.includes(troop) ? (
              <>
                <img
                  src={troopIcons[troop]}
                  alt={i18n(troop)}
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-bold">{i18n(troop)}</span>
              </>
            ) : (
              <>
                <img
                  src={troopIconsBlocked[troop]}
                  alt={i18n(troop)}
                  height={24}
                  width={24}
                />
                <span className="ml-2">{i18n(troop)}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
