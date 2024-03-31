import { FC } from "react";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";

type HeaderProps = {
  fejkomatSettings: FakingSettings;
};

const Header: FC<HeaderProps> = ({ fejkomatSettings }) => {
  const handleCopySettings = async () => {
    try {
      // Convert fejkomatSettings object to a string format to copy
      const settingsStr = JSON.stringify(fejkomatSettings, null, 2);
      await navigator.clipboard.writeText(settingsStr);
      alert("Ustawienia fejkomatu skopiowane!");
    } catch (err) {
      console.error("Failed to copy settings: ", err);
      alert("Nie udało się skopiować ustawień.");
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Fejkomat generator</div>
      <button
        onClick={handleCopySettings}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Kopiuj ustawienia fejkomatu
      </button>
    </header>
  );
};

export default Header;
