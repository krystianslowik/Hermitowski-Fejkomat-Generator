import React from "react";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";
import { useI18n } from "./store/i18n";
import { useFilterCode } from "../helper/CodeFilter";

type OutputProps = {
  code: FakingSettings;
};

export const Output = ({ code }: OutputProps) => {
  const { i18n } = useI18n();
  const filteredCode = useFilterCode(code);

  return (
    <>
      <div className="bg-stone-200 text-stone-900 p-4 my-2 flex flex-col rounded">
        <div className="text-2xl font-bold">{i18n("outputTitle")}</div>
        <div className="w-full md:w-full lg:w-2/3 xl:w-1/2 my-4">
          {i18n("outputDescription")}
        </div>
        <div className="">
          <div className="text-xl font-bold">{i18n("rawOutputTitle")}</div>
          <pre className="border-2 border-solid border-stone-500 p-4 w-full sm:w-full lg:w-full xl:w-2/3 whitespace-pre-wrap break-words text-sm">
            <code>{filteredCode}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
