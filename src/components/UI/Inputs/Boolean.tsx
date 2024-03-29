import { ChangeEvent, ReactElement, useState } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";

type BooleanInputProps = {
  whatField: FejkomatKeys;
  value: boolean; // Changed to boolean
  inputChangeHandler: (whatField: FejkomatKeys, value: any) => void; // Updated signature to pass boolean value
};

export const BooleanInput = ({
  whatField,
  value,
  inputChangeHandler,
}: BooleanInputProps): ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputChangeHandler(whatField, e);
    setIsChecked((prev) => !prev);
  };

  return (
    <>
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
    </>
  );
};
