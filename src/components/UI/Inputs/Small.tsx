import { type ChangeEvent, type ReactElement } from "react";
import { type FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
type SmallInputProps = {
  whatField: FejkomatKeys;
  value: string;
  inputChangeHandler: (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement>
  ) => void;
};
export const SmallInput = ({
  whatField,
  value,
  inputChangeHandler,
}: SmallInputProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputChangeHandler(whatField, e);
  };

  return (
    <input
      className={`rounded-xsm block m-2 p-2 text-sm font-medium text-gray-900`}
      name={whatField}
      type="text"
      value={value}
      placeholder={whatField}
      onChange={(whatField) => handleChange(whatField)}
    />
  );
};
