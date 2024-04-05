import { ChangeEvent, ReactElement, useState } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";
import { defaultSettings } from "../../DefaultValues";

type BooleanInputProps = {
  whatField: FejkomatKeys;
  value: boolean;
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
    inputChangeHandler(whatField, e.target.checked);
    setIsChecked((prev) => !prev);
  };

  return (
    <>
      <div className="p-4 border bg-gray-50 rounded-lg shadow md:flex flex-grow md:items-center md:flex-row">
        <div className="flex-grow mr-2">
          <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
          <div className="mb-2 text-sm text-gray-500">
            {i18n(`${whatField}_description`)}
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <div className="relative w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name={whatField}
              id={whatField}
              checked={isChecked}
              onChange={handleChange} // test commit
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
