import { ChangeEvent, useState } from "react";
import { type FejkomatKeys } from "../../types/FejkomatValuesKeys.types";
import {
  isBlockingGlobal,
  isBlockingLocal,
  isBoundaryBox,
  isBoundaryCircle,
  isDateRange,
  isDateRangePart,
  isFakingResult,
  isTarget,
  isTroops,
} from "../Validations";
import { SmallInput } from "./Inputs/Small";
import { BooleanInput } from "./Inputs/Boolean";

type InputProps = {
  valueToSet: (key: FejkomatKeys, value: any) => void;
  field: FejkomatKeys;
};
export const Input = ({
  field: whatField,
  valueToSet,
}: InputProps): JSX.Element => {
  const [value, setValue] = useState<any>("");
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
    "fill_troops",
    "include_barbarians",
    "skip_night_bonus",
    "changing_village_enabled",
  ]);

  const inputChangeHandler = (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const isCheckbox = e.target.type === "checkbox";
    const value = isCheckbox ? e.target.checked : e.target.value;

    console.log("Field: ", whatField, "Value: ", value);

    setValue((prev: any) => (isCheckbox ? value : value));
    valueToSet(whatField, value);
  };

  return (
    <>
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
          value={value === "true"} // Assuming value is a string that you're converting to boolean
          inputChangeHandler={inputChangeHandler} // Adjust based on your needs
        />
      )}
      <div>
        Input above: <b>{whatField}</b>
      </div>
    </>
  );
};
