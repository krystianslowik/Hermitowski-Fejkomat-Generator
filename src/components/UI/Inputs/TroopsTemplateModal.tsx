import React, { useState } from "react";
import { InputError } from "../Error";
import { Troops } from "../../../types/HermitowskiFejkomat.types";
import { useI18n } from "../../store/i18n";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Troops) => void;
};

const availableTroops: Record<keyof Troops, number> = {
  spear: 0,
  sword: 0,
  axe: 0,
  archer: 0,
  spy: 0,
  light: 0,
  marcher: 0,
  heavy: 0,
  ram: 0,
  catapult: 0,
  knight: 0,
  snob: 0,
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const { i18n } = useI18n();
  const [template, setTemplate] = useState<Troops>({});
  const [error, setError] = useState<string>("");

  const handleChange = (troopType: keyof Troops, value: number) => {
    setTemplate((prev) => ({ ...prev, [troopType]: value }));
    if (error) setError("");
  };

  const handleSave = () => {
    const isAnyFieldFilled = Object.values(template).some((count) => count > 0);
    if (!isAnyFieldFilled) {
      setError(i18n("minimumOneFieldNeeded"));
      return;
    }

    onSave(template);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{i18n("addTemplate")}</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            {i18n("cancel")}
          </button>
        </div>
        {error && <InputError errorMessage={error} />}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Object.keys(availableTroops).map((troopType) => (
            <div
              key={troopType}
              className="flex flex-col items-center p-2 rounded-lg bg-gray-200 shadow"
            >
              <span className="text-sm font-medium text-gray-700">
                {i18n(troopType)}
              </span>
              <input
                type="number"
                className="mt-1 w-1/2 text-center rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                value={template[troopType as keyof Troops] || ""}
                onChange={(e) =>
                  handleChange(
                    troopType as keyof Troops,
                    parseInt(e.target.value, 10) || 0
                  )
                }
                min="0"
              />
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          {i18n("saveTemplate")}
        </button>
      </div>
    </div>
  );
};
