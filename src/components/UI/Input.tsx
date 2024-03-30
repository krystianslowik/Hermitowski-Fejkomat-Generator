import { ChangeEvent, useEffect, useState } from "react";
import { type FejkomatKeys } from "../../types/FejkomatValuesKeys.types";
import { useI18n } from "../store/i18n";
import { SmallInput } from "./Inputs/Small";
import { BooleanInput } from "./Inputs/Boolean";
import InputError from "./Error";
import { Placeholder } from "./Inputs/Placeholder";
import { Coords } from "./Inputs/Coords";
import { Numbers } from "./Inputs/Numbers";

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

  const smallInputs = new Set<FejkomatKeys>([
    "allies",
    "players",
    "ally_tags",
    "exclude_ally_tags",
    "exclude_allies",
    "exclude_players",
  ]);

  const booleanInputs = new Set<FejkomatKeys>([
    "fill_exact",
    "include_barbarians",
    "skip_night_bonus",
    "changing_village_enabled",
  ]);

  const numberInputs = new Set<FejkomatKeys>([
    "player_ids",
    "exclude_player_ids",
    "ally_ids",
    "exclude_ally_ids",
  ]);
  useEffect(() => {
    const validateTextInput = (value: string | boolean): void => {
      if (typeof value === "boolean" || value === "") {
        setError("");
      } else if (value.trim() !== value) {
        setError(i18n("errorLeadingTrailingSpaces"));
      } else if (typeof value === "string" && value !== "coords") {
        const regex =
          /^[a-zA-Z0-9\-_.!@#$%^&*<>|[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']+(\s*[a-zA-Z0-9\-_.!@#$%^&*<>|[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']*)*(,\s*[a-zA-Z0-9\-_.!@#$%^&*<>|[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']+(\s*[a-zA-Z0-9\-_.!@#$%^&*<>|[\]ąćęłńóśżźĄĆĘŁŃÓŚŻŹ']*)*)*$/;
        if (!regex.test(value)) {
          setError(i18n("errorInvalidInputFormat"));
        } else if (whatField !== "coords" && !numberInputs.has(whatField))
          setError("");
      }
    };

    validateTextInput(value);
  }, [i18n, value]); // basic validation for all text inputs
  // todo: REFACTOR THAT KURWAA

  const inputChangeHandler = (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const isCheckbox = e.target.type === "checkbox";
    const newValue = isCheckbox ? e.target.checked : e.target.value;

    console.log("Field: ", whatField, "Value: ", newValue);
    setValue(newValue);
    valueToSet(whatField, newValue);
  };

  return (
    <>
      <div className="r none">
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
        {!smallInputs.has(whatField) &&
          !booleanInputs.has(whatField) &&
          !numberInputs.has(whatField) &&
          whatField !== "coords" && <Placeholder whatField={whatField} />}
        {whatField === "coords" && (
          <Coords
            whatField={whatField}
            value={value}
            inputChangeHandler={inputChangeHandler}
            setError={setError}
          />
        )}
        {numberInputs.has(whatField) && (
          <Numbers
            whatField={whatField}
            value={value}
            inputChangeHandler={inputChangeHandler}
            setError={setError}
          />
        )}
        {error && <InputError errorMessage={error} />}
      </div>
    </>
  );
};
