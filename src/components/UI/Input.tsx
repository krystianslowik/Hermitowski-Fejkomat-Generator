import { ChangeEvent, useState } from "react";
import { type FejkomatKeys } from "../../types/FejkomatValuesKeys.types";
import { useI18n } from "../store/i18n";
// import {
//   isBlockingGlobal,
//   isBlockingLocal,
//   isBoundaryBox,
//   isBoundaryCircle,
//   isDateRange,
//   isDateRangePart,
//   isFakingResult,
//   isTarget,
//   isTroops,
// } from "../Validations"; // TODO? dodać walidacjeeeeee
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
    "fill_troops",
    "include_barbarians",
    "skip_night_bonus",
    "changing_village_enabled",
  ]);

  const inputChangeHandler = (
    whatField: FejkomatKeys,
    e: ChangeEvent<HTMLInputElement> // todo: change directly to value?
  ): void => {
    const isCheckbox = e.target.type === "checkbox";
    const value = isCheckbox ? e.target.checked : e.target.value;

    //todo: add validation for coords and other fields.

    console.log("Field: ", whatField, "Value: ", value);
    setValue((prev: any) => (isCheckbox ? value : value));
    valueToSet(whatField, value);
  };

  return (
    <>
      <div className="flex  align-middle justify-between bg-slate-200 m-1 p-2 border-red-300">
        <span>
          Input: <b>{i18n(whatField)}</b>
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
            value={value}
            inputChangeHandler={inputChangeHandler}
          />
        )}
      </div>
    </>
  );
};
