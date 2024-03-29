import { ChangeEvent, ReactElement } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";

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
  const { i18n } = useI18n();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    inputChangeHandler(whatField, e);
  };

  return (
    <>
      <input
        className="rounded-lg block w-full  p-2 mr-4 text-sm text-gray-900 bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        name={whatField}
        type="text"
        value={value}
        placeholder={i18n(whatField)}
        onChange={handleChange}
      />
    </>
  );
};
