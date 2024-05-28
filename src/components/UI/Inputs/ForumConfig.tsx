import React, { useState, FC, ChangeEvent } from "react";
import { FejkomatKeys } from "../../../types/FejkomatValuesKeys.types";
import { useI18n } from "../../store/i18n";
import { InputError } from "../Error";

type ForumConfigProps = {
  whatField: FejkomatKeys;
  inputChangeHandler: (
    whatField: FejkomatKeys,
    value: { [key: string]: any } | string
  ) => void | null;
};

export const ForumConfig: FC<ForumConfigProps> = ({
  whatField,
  inputChangeHandler,
}) => {
  const { i18n } = useI18n();
  const [config, setConfig] = useState({
    thread_id: 0,
    page: 0,
    spoiler_name: "",
    time_to_live_s: 3600,
  });
  const [error, setError] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const value =
      key === "spoiler_name" ? e.target.value : Number(e.target.value);
    const updatedConfig = { ...config, [key]: value };
    setConfig(updatedConfig);
    validateInput(value, key, updatedConfig);
  };

  const validateInput = (
    value: string | number,
    key: string,
    updatedConfig: { [key: string]: any }
  ) => {
    let error = "";
    if (key === "thread_id" || key === "page" || key === "time_to_live_s") {
      const regex = /^\d+$/;
      if (!regex.test(value.toString())) {
        error = i18n("errorNumberInvalid");
      }
    } else if (key === "spoiler_name") {
      if (typeof value !== "string" || value.trim() === "") {
        error = i18n("errorInvalidInputFormat");
      }
    }

    setError(error);

    if (!error) {
      inputChangeHandler(whatField, updatedConfig);
    }
  };

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      inputChangeHandler(whatField, config);
    } else {
      setConfig({
        thread_id: 0,
        page: 0,
        spoiler_name: "",
        time_to_live_s: 0,
      });
      inputChangeHandler(whatField, "");
    }
  };

  return (
    <div className="relative flex flex-col p-4 border border-gray-300 bg-gray-50 rounded-lg shadow w-full">
      <div className="mb-2 flex justify-between pr-2">
        <span className="text-lg font-bold">{i18n(whatField)}</span>
        <div className="relative w-10 ml-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name={whatField}
            id={whatField}
            checked={isChecked}
            onChange={handleSwitchChange}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor={whatField}
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
      <div className="w-full text-sm text-gray-500 mb-4">
        {i18n(`${whatField}_description`)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(config).map((key) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {i18n(key)}
            </label>
            <input
              className={`rounded-lg block w-full p-2 mr-4 text-sm ${
                !isChecked
                  ? "bg-gray-200 text-gray-500"
                  : "text-gray-900 bg-white"
              } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              name={key}
              type={key === "spoiler_name" ? "text" : "number"}
              value={config[key as keyof typeof config]}
              placeholder={i18n(key)}
              onChange={(e) => handleChange(e, key)}
              maxLength={key === "spoiler_name" ? 255 : undefined}
              disabled={!isChecked}
            />
          </div>
        ))}
      </div>
      {error && <InputError errorMessage={error} />}
    </div>
  );
};
