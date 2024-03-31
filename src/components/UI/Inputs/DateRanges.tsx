import { FC } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";
type DateRangesInputProps = {
  whatField: FejkomatKeys;
  inputChangeHandler?: (whatField: FejkomatKeys) => void;
};
export const DateRangesInput: FC<DateRangesInputProps> = ({ whatField }) => {
  const { i18n } = useI18n();
  return (
    <>
      <div className="relative flex max-w-1/2 p-4 border border-gray-300 bg-gray-50 rounded-lg shadow flex-col items-start">
        <div className="flex flex-col flex-grow">
          <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
          <div className="mb-2 w-full text-sm text-gray-500">
            {i18n(`${whatField}_description`)}
          </div>
        </div>
        <input
          type="datetime-local"
          className="rounded-lg block w-full p-2 mr-4 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          onChange={(e) => console.log(e)}
        />
      </div>
    </>
  );
};
