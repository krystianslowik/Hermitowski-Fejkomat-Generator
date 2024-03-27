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
      <label htmlFor={whatField}>Name: {whatField}</label>
      <input
        className="rounded-xsm block m-2 p-2 text-sm font-medium text-gray-900"
        name={whatField}
        type="checkbox" // Changed to checkbox
        checked={isChecked} // Use checked for checkboxes instead of value
        onChange={handleChange} // Updated to use handleChange
      />
    </>
  );
};
