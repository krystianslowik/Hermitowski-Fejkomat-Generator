import { ReactElement } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";

type PlaceholderProps = {
  whatField: FejkomatKeys;
};

export const Placeholder = ({ whatField }: PlaceholderProps): ReactElement => {
  const { i18n } = useI18n();
  return (
    <div className="relative flex flex-grow p-4 border border-gray-300 bg-gray-50 text-gray-300 rounded-lg shadow flex-col items-start">
      {/* Badge indicating availability soon */}
      <div className="absolute top-2 right-2 bg-yellow-500 text-white py-1 px-3 text-xs rounded-full">
        {i18n("availableSoon")}
      </div>

      <div className="flex flex-col flex-grow">
        <span className="mb-1 text-lg font-bold">{i18n(whatField)}</span>
        <div className="mb-2 w-full text-sm">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
    </div>
  );
};
