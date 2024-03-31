import React, { useState } from "react";
import "./App.css";

import { Input } from "./components/UI/Input";
import { FakingSettings } from "./types/HermitowskiFejkomat.types";
import { defaultSettings, fejkomatyFields } from "./components/DefaultValues";
import { FejkomatKeys } from "./types/FejkomatValuesKeys.types";
import { Output } from "./components/Output";
import Header from "./components/Header";
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
    <>
      <Header fejkomatSettings={fejkomatSettings} />
      <div className="flex flex-col md:grid md:grid-cols-1 bg-slate-100  p-4 w-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {fejkomatyFields.map((field) => (
            <Input valueToSet={setNewSettings} field={field} key={field} />
          ))}
        </div>
      </div>
      <Output code={fejkomatSettings} />
    </>
  );
}

export default App;
