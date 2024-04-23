import { FC } from "react";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";
import { useI18n } from "./store/i18n";
import { useFilterCode } from "../helper/CodeFilter";

type HeaderProps = {
  fejkomatSettings: FakingSettings;
};

const Header: FC<HeaderProps> = ({ fejkomatSettings }) => {
  const { language, i18n, setLanguage } = useI18n();
  const filteredCode = useFilterCode(fejkomatSettings);

  const logo = "/fejkomat-logo.png";

  const handleCopySettings = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(filteredCode);
      } else {
        // fallback for iphones and safari (retards dont support navigator.clipboard)
        const textarea = document.createElement("textarea");
        textarea.value = filteredCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }

      alert("Ustawienia fejkomatu skopiowane!");
    } catch (err) {
      console.error("Failed to copy settings: ", err);
      alert(`Nie udało się skopiować ustawień. ${err}`);
    }
  };

  return (
    <header className="bg-stone-200 text-stone-900 p-4 my-2 flex flex-col md:flex-row justify-around items-center rounded">
      <div className="flex items-center justify-center text-lg font-bold">
        <img src={logo} alt="Fejkomat generator" width={64} />
      </div>

      <div className="w-full flex flex-col md:flex-row mt-4 md:mt-0 justify-around md:justify-end">
        <button
          onClick={handleCopySettings}
          className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mb-4 md:mb-0 w-full md:w-auto"
        >
          {i18n("copyScript")}
        </button>
        <button
          onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
          className="flex bg-stone-300 hover:bg-stone-500 text-white md:ml-4 font-bold py-2 px-4 rounded transition duration-300 ease-in-out items-center justify-center w-full md:w-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
