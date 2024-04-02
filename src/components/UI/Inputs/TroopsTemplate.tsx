import React, { useState } from "react";
import { Modal } from "./TroopsTemplateModal"; // Adjust import path as needed
import { useI18n } from "../../store/i18n";
import { Troops } from "../../../types/HermitowskiFejkomat.types";
import { troopIcons } from "../../../assets/icons/TroopsIcons";

import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";

type TroopsInputProps = {
  whatField: FejkomatKeys;
  inputChangeHandler: (whatField: FejkomatKeys, value: Troops[]) => void;
};

export const TroopsInput = ({
  whatField,
  inputChangeHandler,
}: TroopsInputProps) => {
  const { i18n } = useI18n();
  const [templates, setTemplates] = useState<Troops[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveNewTemplate = (newTemplate: Troops) => {
    const newTemplates = [...templates, newTemplate];
    setTemplates(newTemplates);
    inputChangeHandler(whatField, newTemplates);
    setIsModalOpen(false);
  };

  const removeTemplate = (index: number) => {
    const newTemplates = templates.filter((_, i) => i !== index);
    setTemplates(newTemplates);
    inputChangeHandler(whatField, newTemplates);
  };

  return (
    <div className=" relative flex max-h-[245px] min-h-[120px] flex-grow flex-col justify-between overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-4 shadow">
      <div className="mb-2">
        <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
        <div className="w-full text-sm text-gray-500">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
      <div className="overflow-auto align-middle max-h-[180px]">
        {templates.map((template, index) => (
          <div
            key={index}
            className="my-2 flex flex-wrap items-center justify-start rounded-lg border bg-gray-50 p-4 shadow"
          >
            {Object.keys(template).map((troopType) => {
              const key = troopType as keyof Troops;
              const troopCount = template[key] ?? 0; // fallback to 0 if undefined
              return troopCount > 0 ? (
                <div
                  key={troopType}
                  className="p-2 m-1 rounded bg-gray-100 text-center"
                >
                  <div className="flex flex-col items-center text-xs">
                    <img
                      src={troopIcons[troopType]}
                      alt={i18n(troopType)}
                      width={20}
                    />
                    <span className="font-bold "> {troopCount}</span>
                  </div>
                </div>
              ) : null;
            })}
            <button
              className="ml-auto text-red-500 hover:text-red-700"
              onClick={() => removeTemplate(index)}
            >
              {i18n("removeTemplate")}
            </button>
          </div>
        ))}
        <div
          className="flex flex-wrap justify-start items-center p-4 border bg-stone-500  hover:bg-stone-600 rounded-lg shadow my-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-white w-full text-center">
            {i18n("addTemplate")}
          </span>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewTemplate}
      />
    </div>
  );
};
