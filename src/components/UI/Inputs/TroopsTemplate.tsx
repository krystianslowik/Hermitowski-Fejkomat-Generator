import React, { useState } from "react";
import { Modal } from "./TroopsTemplateModal"; // Adjust import path as needed
import { useI18n } from "../../store/i18n";
import { Troops } from "../../../types/HermitowskiFejkomat.types";
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
    <div className="relative flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg shadow max-h-[250px] overflow-hidden">
      <div className="mb-2">
        <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
        <div className="w-full text-sm text-gray-500">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        {templates.map((template, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-start items-center p-4 border bg-gray-50 rounded-lg shadow my-2"
          >
            {Object.keys(template).map((troopType) => {
              const key = troopType as keyof Troops;
              const troopCount = template[key] ?? 0; // fallback to 0 if undefined
              return troopCount > 0 ? (
                <div
                  key={troopType}
                  className="p-2 m-1 rounded bg-gray-100 text-center"
                >
                  <span className="text-xs">
                    {`${i18n(troopType)}:`}{" "}
                    <span className=" font-bold"> {troopCount}</span>
                  </span>
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

        <button
          className="p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          {i18n("addTemplate")}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewTemplate}
      />
    </div>
  );
};
