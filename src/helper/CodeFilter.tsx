import { useState, useEffect } from "react";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";
import { FejkomatKeys } from "../types/FejkomatValuesKeys.types";

interface CodeType {
  [key: string]: any; //todo! correct types!!!!!!!!!!!!!
}

export const useFilterCode = (code: CodeType): string => {
  const [filteredCodeString, setFilteredCodeString] = useState("");

  useEffect(() => {
    const filteredCode = Object.entries(code).reduce(
      (acc: Partial<FakingSettings>, [key, value]) => {
        if (
          value !== undefined &&
          value !== ("" as string) &&
          !(Array.isArray(value) && value.length === 0) &&
          !(
            typeof value === "object" &&
            value !== null &&
            Object.keys(value).length === 0
          )
        ) {
          const validKey = key as FejkomatKeys;
          acc[validKey] = value;
        }
        return acc;
      },
      {} as Partial<FakingSettings>
    );

    const codeString = `javascript: var HermitowskieFejki = ${JSON.stringify(
      filteredCode,
      null,
      4
    )}; $.ajax('https://media.innogamescdn.com/com_DS_PL/skrypty/HermitowskieFejki.js?_='+~~(Date.now()/9e6),{cache:1,dataType:'script'}); void (0);`;

    setFilteredCodeString(codeString);
  }, [code]);

  return filteredCodeString;
};
