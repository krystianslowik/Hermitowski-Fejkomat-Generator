import React from "react";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";
import { FejkomatKeys } from "../types/FejkomatValuesKeys.types";

type OutputProps = {
  code: FakingSettings;
};

export const Output = ({ code }: OutputProps) => {
  const filteredCode = Object.entries(code).reduce(
    (acc: Partial<FakingSettings>, [key, value]) => {
      if (
        value !== undefined && // remove undefined
        value !== "" && // remove empty
        !(Array.isArray(value) && value.length === 0) && // remove empty arrays
        !(
          typeof value === "object" &&
          value !== null &&
          Object.keys(value).length === 0
        ) // remove empty objects
      ) {
        const validKey = key as FejkomatKeys;
        acc[validKey] = value;
      }
      return acc;
    },
    {} as FakingSettings
  );

  return (
    <>
      <pre>
        <code>{JSON.stringify(filteredCode, null, 4)}</code>
      </pre>
    </>
  );
};
