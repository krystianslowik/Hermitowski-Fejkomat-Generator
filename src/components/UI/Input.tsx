import { useState } from "react";
import { type FejkomatKeys } from "../../types/FejkomatValuesKeys.types";
import { useI18n } from "../store/i18n";

import { SmallInput } from "./Inputs/Small";
import { BooleanInput } from "./Inputs/Boolean";

import { Placeholder } from "./Inputs/Placeholder";
import { Coords } from "./Inputs/Coords";
import { Numbers } from "./Inputs/Numbers";
import { FillTroopsInput } from "./Inputs/FillTroops";
import { Troops } from "../../types/HermitowskiFejkomat.types";
import { TroopsInput } from "./Inputs/TroopsTemplate";
import { SafeguardInput } from "./Inputs/Safeguard";
import { DateRangesInput } from "./Inputs/DateRanges";
import { ForumConfig } from "./Inputs/ForumConfig";

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
    newValue:
      | string
      | boolean
      | Troops
      | Troops[]
      | string[]
      | { [key: string]: any }
  ): void => {
    console.log("Field: ", whatField, "Value: ", newValue);
    setValue(newValue);
    typeof newValue === "string" && validateTextInput(newValue); // Directly call validation here
    valueToSet(whatField, newValue);
  };

  return (
    <>
      <div className="flex">
        {smallInputs.has(whatField) && (
          <SmallInput
            whatField={whatField}
            value={value}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
            error={error}
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
        {numberInputs.has(whatField) && (
          <Numbers
            whatField={whatField}
            value={value}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
            error={error}
          />
        )}
        {whatField === "coords" && (
          <Coords
            whatField={whatField}
            value={value}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
            error={error}
          />
        )}
        {whatField === "fill_troops" && (
          <FillTroopsInput
            whatField={whatField}
            inputChangeHandler={(field, value) =>
              inputChangeHandler(field, value)
            }
          />
        )}
        {whatField === "troops_templates" && (
          <TroopsInput
            whatField={whatField}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        {whatField === "safeguard" && (
          <SafeguardInput
            whatField={whatField}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        {whatField === "date_ranges" && (
          <DateRangesInput
            whatField={whatField}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        {whatField === "forum_config" && (
          <ForumConfig
            whatField={whatField}
            inputChangeHandler={inputChangeHandler}
          />
        )}
        {!smallInputs.has(whatField) &&
          !booleanInputs.has(whatField) &&
          !numberInputs.has(whatField) &&
          whatField !== "coords" &&
          whatField !== "troops_templates" &&
          whatField !== "date_ranges" &&
          whatField !== "safeguard" &&
          whatField !== "forum_config" &&
          whatField !== "fill_troops" && <Placeholder whatField={whatField} />}
      </div>
    </>
  );
};
