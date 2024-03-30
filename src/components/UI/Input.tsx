import { useState } from "react";
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

  const validateTextInput = (value: string | boolean): void => {
    setError("");
    // clean errors for empty and booleans
    if (typeof value === "boolean" || value === "") {
      setError("");
      return;
    }

    // remove spaces
    if (value.trim() !== value) {
      setError(i18n("errorLeadingTrailingSpaces"));
      return;
    }

    // any other string values in format "źółć,jakaś inna źółć!!!,wdewrgfa"
    if (typeof value === "string") {
      const regex = /^(.*)(,\s*.*)*$/;
      if (!regex.test(value)) {
        setError(i18n("errorInvalidInputFormat"));
        return;
      }
    }

    // number inputs in format "111,222,333"
    if (numberInputs.has(whatField)) {
      const regex = /^\d{1,64}(,\d{1,64})*$/;
      regex.test(value) || setError(i18n("errorNumberInvalid"));
      return;
    }
    // coords in format "111|222,222|333"
    if (whatField === "coords") {
      const regex = /^\d{3}\|\d{3}(,\d{3}\|\d{3})*$/;
      !regex.test(value.trim()) && setError(i18n("errorCoordsInvalid"));
      return;
    }
    // if valid, clean error
    setError("");
  };

  const inputChangeHandler = (
    whatField: FejkomatKeys,
    newValue: string | boolean
  ): void => {
    console.log("Field: ", whatField, "Value: ", newValue);
    setValue(newValue);
    validateTextInput(newValue); // Directly call validation here
    valueToSet(whatField, newValue);
  };

  return (
    <>
      <div className="r none">
        {smallInputs.has(whatField) && (
          <SmallInput
            whatField={whatField}
            value={value}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
          />
        )}
        {booleanInputs.has(whatField) && (
          <BooleanInput
            whatField={whatField}
            value={typeof value === "boolean" ? value : false}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
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
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
            setError={setError}
          />
        )}
        {numberInputs.has(whatField) && (
          <Numbers
            whatField={whatField}
            value={value}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
            setError={setError}
          />
        )}
        {error && <InputError errorMessage={error} />}
      </div>
    </>
  );
};
