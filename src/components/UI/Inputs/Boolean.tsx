import { ChangeEvent, ReactElement, useState } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";
import { fejkomatyFields, defaultSettings } from "../../DefaultValues";

type BooleanInputProps = {
  whatField: FejkomatKeys;
  value: boolean; // Changed to boolean
  inputChangeHandler: (whatField: FejkomatKeys, value: any) => void;
};

export const BooleanInput = ({
  whatField,
  value,
  inputChangeHandler,
}: BooleanInputProps): ReactElement => {
  const { i18n } = useI18n();
  const [isChecked, setIsChecked] = useState<boolean>(() => {
    if (
      whatField in defaultSettings &&
      typeof defaultSettings[whatField] === "boolean"
    ) {
      return defaultSettings[whatField] as boolean;
    }
    return false;
  }); // todo refaktor, add this to parent

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputChangeHandler(whatField, e);
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <div className=" flex p-4 border border-red-300 rounded-lg shadow flex-row items-center">
        <div className="flex flex-col flex-grow">
          <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
          <div className="mb-2 w-full text-sm text-gray-500">
            {i18n(`${whatField}_description`)}
          </div>
        </div>
        <div className="flex ">
          <div className="relative  w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name={whatField}
              id={whatField}
              checked={isChecked}
              onChange={handleChange} // Updated to use handleChange
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor={whatField}
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>
      </div>
    </>
  );
};
