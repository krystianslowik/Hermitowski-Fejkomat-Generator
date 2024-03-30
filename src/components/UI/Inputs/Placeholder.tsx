import { ReactElement } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";

type PlaceholderProps = {
  whatField: FejkomatKeys;
};

export const Placeholder = ({ whatField }: PlaceholderProps): ReactElement => {
  return (
    <>
      <div className="relative flex p-4 border border-red-300 rounded-lg shadow flex-col items-start">
        <div className="flex flex-col flex-grow">
          <span className="mb-1 text-lg font-bold">{whatField}</span>
          <div className="mb-2 w-full text-sm text-gray-500">[description]</div>
        </div>
      </div>
    </>
  );
};
