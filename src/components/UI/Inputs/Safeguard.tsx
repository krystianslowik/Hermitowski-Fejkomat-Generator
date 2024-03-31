import React, { useState } from "react";
import { Modal } from "./TroopsTemplateModal"; // Adjust import path as needed
import { useI18n } from "../../store/i18n";
import { Troops } from "../../../types/HermitowskiFejkomat.types";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";

type SafeguardInputProps = {
  whatField: FejkomatKeys;
  inputChangeHandler: (whatField: FejkomatKeys, value: Troops) => void;
};

export const SafeguardInput = ({
  whatField,
  inputChangeHandler,
}: SafeguardInputProps) => {
  const { i18n } = useI18n();
  const [templates, setTemplates] = useState<Troops>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveNewTemplate = (newTemplate: Troops) => {
    setTemplates(newTemplate);
    inputChangeHandler(whatField, newTemplate);
    setIsModalOpen(false);
  };

  const removeTemplate = () => {
    setTemplates({});
    inputChangeHandler(whatField, {});
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
        {Object.keys(templates).length > 0 ? (
          <div className="flex flex-wrap justify-start items-center p-4 border bg-gray-50 rounded-lg shadow my-2">
            {Object.values(templates).some((value) => value > 0) &&
              Object.entries(templates).map(([troopType, troopCount]) =>
                troopCount > 0 ? (
                  <div
                    key={troopType}
                    className="p-2 m-1 rounded bg-gray-100 text-center"
                  >
                    <span className="text-xs">
                      {`${i18n(troopType)}:`}{" "}
                      <span className="font-bold">{troopCount}</span>
                    </span>
                  </div>
                ) : null
              )}
            <button
              className="ml-auto text-red-500 hover:text-red-700"
              onClick={() => removeTemplate()}
            >
              {i18n("removeTemplate")}
            </button>
          </div>
        ) : (
          <div
            className="flex flex-wrap justify-start items-center p-4 border bg-blue-500  hover:bg-blue-600 rounded-lg shadow my-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-white w-full text-center">
              {i18n("addTemplate")}
            </span>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewTemplate}
      />
    </div>
  );
};
