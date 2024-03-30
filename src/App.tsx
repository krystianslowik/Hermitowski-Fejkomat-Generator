import React, { useState } from "react";
import "./App.css";

import { Input } from "./components/UI/Input";
import { FakingSettings } from "./types/HermitowskiFejkomat.types";
import { defaultSettings, fejkomatyFields } from "./components/DefaultValues";
import { FejkomatKeys } from "./types/FejkomatValuesKeys.types";
import { Output } from "./components/Output";
function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fejkomatSettings, setFejkomatSettings] =
    useState<FakingSettings>(defaultSettings);
  if (fejkomatSettings) console.log(fejkomatSettings); // filler

  const setNewSettings = (key: FejkomatKeys, value: any): void => {
    console.log(key, value);
    setFejkomatSettings((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 bg-slate-100 text-red-700 p-4 w-full overflow-hidden">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {fejkomatyFields.map((field) => (
          <Input valueToSet={setNewSettings} field={field} key={field} />
        ))}
      </div>
      <Output code={fejkomatSettings} />
    </div>
  );
}

export default App;
