import React, { useState } from "react";
import "./App.css";

import { Input } from "./components/UI/Input";
import { FakingSettings } from "./types/HermitowskiFejkomat.types";
import { defaultSettings, fejkomatyFields } from "./components/DefaultValues";
import { FejkomatKeys } from "./types/FejkomatValuesKeys.types";
import { Output } from "./components/Output";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
function App() {
  const [fejkomatSettings, setFejkomatSettings] =
    useState<FakingSettings>(defaultSettings);

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
      <div className="relative flex flex-col md:grid md:grid-cols-1 bg-slate-100 px-4 md:px-12 lg:px-24 py-4 w-full overflow-hidden">
        <Header fejkomatSettings={fejkomatSettings} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {fejkomatyFields.map((field) => (
            <Input valueToSet={setNewSettings} field={field} key={field} />
          ))}
        </div>
        <Output code={fejkomatSettings} />
        <Footer />
      </div>
    </>
  );
}

export default App;
