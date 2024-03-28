import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  type LanguageKey,
  type I18nContextType,
  type TranslationMap,
} from "../../types/i18n.types";

const translations: TranslationMap = {
  safeguard: { en: "Safeguard", pl: "Ochrona" },
  troops_templates: { en: "Troops Templates", pl: "Szablony Wojsk" },
  fill_exact: { en: "Fill Exact", pl: "Dokładne Wypełnienie" },
  players: { en: "Players", pl: "Gracze" },
  fill_troops: { en: "Fill troops", pl: "Uzupełnij wojsko" },
  coords: { en: "Coords", pl: "Koordynaty" },
  player_ids: { en: "Players (ID)", pl: "Gracze (ID)" },
  allies: { en: "Allies (names)", pl: "Plemiona (nazwy)" },
  ally_tags: { en: "Ally Tags", pl: "Plemiona (tag)" },
  ally_ids: { en: "Ally IDs", pl: "Plemiona (ID)" },
  exclude_players: { en: "Exclude Players", pl: "Wyklucz graczy" },
  exclude_player_ids: { en: "Exclude Player IDs", pl: "Wyklucz ID graczy" },
  exclude_allies: { en: "Exclude Allies", pl: "Wyklucz plemiona" },
  exclude_ally_tags: { en: "Exclude Ally Tags", pl: "Wyklucz tagi plemion" },
  exclude_ally_ids: { en: "Exclude Ally IDs", pl: "Wyklucz ID plemion" },
  include_barbarians: {
    en: "Include Barbarians",
    pl: "Uwzględnij barbarzyńców",
  },
  boundaries_circle: { en: "Boundaries (Circle)", pl: "Granice (koło)" },
  boundaries_box: { en: "Boundaries (Box)", pl: "Granice (prostokąt)" },
  blocking_enabled: { en: "Blocking Enabled", pl: "Blokowanie włączone" },
  blocking_local: { en: "Local Blocking", pl: "Blokada lokalna" },
  blocking_global: { en: "Global Blocking", pl: "Blokada globalna" },
  skip_night_bonus: { en: "Skip Night Bonus", pl: "Pomiń bonus nocny" },
  date_ranges: { en: "Date Ranges", pl: "Zakresy dat" },
  changing_village_enabled: {
    en: "Changing Village Enabled",
    pl: "Zmiana wioski włączona",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKey>("pl");

  const i18n = (key: string) => {
    return translations[key]?.[language] ?? key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, i18n }}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook to use the i18n context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
