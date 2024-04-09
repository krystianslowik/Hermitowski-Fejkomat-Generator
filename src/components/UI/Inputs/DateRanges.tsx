import React, { useState, FC } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";

type DateRangesInputProps = {
  whatField: FejkomatKeys;
  inputChangeHandler: (whatField: FejkomatKeys, value: string[]) => void;
};

export const DateRangesInput: FC<DateRangesInputProps> = ({
  whatField,
  inputChangeHandler,
}) => {
  const { i18n } = useI18n();
  const [dateRanges, setDateRanges] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [isDateTime, setIsDateTime] = useState(false);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleAddDateRange = (): void => {
    if (startValue && endValue) {
      const convertDateFormat = (dateString: string): string => {
        const [datePart, timePart] = dateString.split(" ");
        const [year, month, day] = datePart.split("-");
        return `${day}.${month}.${year} ${timePart}`;
      };

      let formattedStartValue = startValue;
      let formattedEndValue = endValue;

      if (isDateTime) {
        formattedStartValue = convertDateFormat(startValue);
        formattedEndValue = convertDateFormat(endValue);
      }

      const newRange = `${formattedStartValue} - ${formattedEndValue}`;

      const updatedDateRanges = [...dateRanges, newRange];
      setDateRanges(updatedDateRanges);

      inputChangeHandler(whatField, updatedDateRanges);

      setStartValue("");
      setEndValue("");
      setShowInput(false);
    }
  };

  const handleRemoveDateRange = (index: number) => {
    const updatedDateRanges = dateRanges.filter((_, idx) => idx !== index);
    setDateRanges(updatedDateRanges);
    inputChangeHandler(whatField, updatedDateRanges);
  };

  return (
    <div className="relative flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg max-h-[250px] overflow-hidden shadow">
      <div className="mb-2">
        <span className="text-lg font-bold">{i18n(whatField)}</span>
        <div className="w-full text-sm text-gray-500">
          {i18n(`${whatField}_description`)}
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        {dateRanges.map((range, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border bg-gray-50 rounded-lg shadow my-2 text-sm"
          >
            <span>{range}</span>
            <button
              onClick={() => handleRemoveDateRange(index)}
              className="text-red-500 hover:text-red-700"
            >
              {i18n("remove")}
            </button>
          </div>
        ))}
        {showInput && (
          <>
            <div className="flex items-center my-4">
              <label className="flex items-center cursor-pointer text-sm text-gray-700">
                <div className="relative w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name={whatField}
                    id={whatField}
                    checked={isDateTime}
                    onChange={() => setIsDateTime(!isDateTime)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor={whatField}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>

                <span className="ml-2">{i18n("useDateTime")}</span>
              </label>
            </div>

            <div className="flex flex-row">
              <input
                type={isDateTime ? "datetime-local" : "time"}
                value={startValue}
                className="rounded-lg p-2 max-w-24 mx-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) =>
                  setStartValue(e.target.value.replace("T", " "))
                }
              />
              <input
                type={isDateTime ? "datetime-local" : "time"}
                value={endValue}
                className="rounded-lg p-2 max-w-24 mx-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setEndValue(e.target.value.replace("T", " "))}
              />
              <button
                onClick={handleAddDateRange}
                className="ml-2 bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded"
              >
                {i18n("add")}
              </button>
            </div>
          </>
        )}
        {!showInput && (
          <div
            className="flex justify-center items-center p-4 border bg-stone-500 hover:bg-stone-600 rounded-lg shadow my-2 cursor-pointer"
            onClick={handleAddClick}
          >
            <span className="text-white text-center">
              {i18n("addDateRange")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
