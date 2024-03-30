import { ChangeEvent, ReactElement } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";
import InputError from "../Error";

type NumbersInputProps = {
  whatField: FejkomatKeys;
  value: string;
  inputChangeHandler: (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement>
  ) => void;

  setError: (value: string) => void;
};

export const Numbers = ({
  whatField,
  value,
  inputChangeHandler,
  setError,
}: NumbersInputProps): ReactElement => {
  const { i18n } = useI18n();

  const validateNumber = (input: string): boolean => {
    const pattern = /^\d{1,64}(,\d{1,64})*$/;
    return pattern.test(input.trim());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const isValid = validateNumber(inputValue);
    isValid ? setError("") : setError(i18n("errorNumberInvalid"));
    console.log(`Value ${inputValue} is valid: `, isValid);
    inputChangeHandler(whatField, e); // Always call inputChangeHandler
  };

  return (
    <>
      <div className="relative flex p-4 border border-red-300 rounded-lg shadow flex-col items-start">
        <div className="flex flex-col flex-grow">
          <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
          <div className="mb-2 w-full text-sm text-gray-500">
            {i18n(`${whatField}_description`)}
          </div>
        </div>
        <input
          className="rounded-lg block w-full p-2 mr-4 text-sm text-gray-900 bg-white border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          name={whatField}
          type="text"
          value={value}
          placeholder={i18n(whatField)}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
