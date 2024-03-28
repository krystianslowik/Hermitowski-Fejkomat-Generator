import { ChangeEvent, useEffect, useState } from "react";
import { type FejkomatKeys } from "../../types/FejkomatValuesKeys.types";
import { useI18n } from "../store/i18n";
import { SmallInput } from "./Inputs/Small";
import { BooleanInput } from "./Inputs/Boolean";
import InputError from "./Error";

type InputProps = {
  valueToSet: (key: FejkomatKeys, value: any) => void;
  field: FejkomatKeys;
};

export const Input = ({
  field: whatField,
  valueToSet,
}: InputProps): JSX.Element => {
  const [value, setValue] = useState<any>("");
  const [error, setError] = useState<string>("");
  const { i18n } = useI18n();

  const smallInputs = new Set([
    "allies",
    "players",
    "ally_tags",
    "exclude_ally_tags",
    "exclude_allies",
    "exclude_players",
  ]);

  const booleanInputs = new Set([
    "fill_exact",
    "include_barbarians",
    "skip_night_bonus",
    "changing_village_enabled",
  ]);
  useEffect(() => {
    const validateTextInput = (value: string | boolean): void => {
      if (typeof value === "boolean" || value === "") {
        setError("");
      } else if (value.trim() !== value) {
        setError(i18n("errorLeadingTrailingSpaces"));
      } else {
        // Regex adjusted to allow -, _, and . characters and removed space before comma check
        const regex =
          /^[a-zA-Z0-9\-_\.!@#$%^&*<>[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']+(\s*[a-zA-Z0-9\-_\.!@#$%^&*<>[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']*)*(,\s*[a-zA-Z0-9\-_\.!@#$%^&*<>[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']+(\s*[a-zA-Z0-9\-_\.!@#$%^&*<>[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']*)*)*$/;
        if (!regex.test(value)) {
          setError(i18n("errorInvalidInputFormat"));
        } else {
          setError("");
        }
      }
    };

    validateTextInput(value);
  }, [i18n, value]);

  const inputChangeHandler = (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const isCheckbox = e.target.type === "checkbox";
    const newValue = isCheckbox ? e.target.checked : e.target.value;

    console.log("Field: ", whatField, "Value: ", newValue);
    setValue(newValue); // Simplified this line as `prev` was not being used
    valueToSet(whatField, newValue);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-slate-200 m-1 p-2 border-red-300">
        <span>
          <b>{i18n(whatField)}</b>
        </span>
        {smallInputs.has(whatField) && (
          <SmallInput
            whatField={whatField}
            value={value}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        {booleanInputs.has(whatField) && (
          <BooleanInput
            whatField={whatField}
            value={typeof value === "boolean" ? value : false}
            inputChangeHandler={inputChangeHandler}
          />
        )}
      </div>
      {error && <InputError errorMessage={error} />}
    </>
  );
};
