import { ChangeEvent, ReactElement } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";

type CoordsInputProps = {
  whatField: FejkomatKeys;
  value: string;
  inputChangeHandler: (whatField: FejkomatKeys, value: string) => void;
  setError: (value: string) => void;
};

export const Coords = ({
  whatField,
  value,
  inputChangeHandler,
  setError,
}: CoordsInputProps): ReactElement => {
  const { i18n } = useI18n();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const adjustedValue = e.target.value.replace(" ", "");
    inputChangeHandler(whatField, adjustedValue);
  };

  return (
    <div className="relative flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg shadow h-full">
      <div className="mb-2">
        <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
        <div className="w-full text-sm text-gray-500">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
      <textarea
        className="flex-1 resize-none rounded-lg block w-full p-2 text-sm text-gray-800 bg-white border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        name={whatField}
        value={value}
        placeholder={i18n(whatField)}
        onChange={handleChange}
        maxLength={1199} // Assuming 150 coords, comma separated
      />
    </div>
  );
};
