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
  players: { en: "Players (nick)", pl: "Gracze (nick)" },
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
  errorEmptyInput: {
    en: "Input cannot be empty.",
    pl: "Pole nie może być puste.",
  },
  errorLeadingTrailingSpaces: {
    en: "Remove leading or trailing spaces.",
    pl: "Usuń spacje na początku lub na końcu.",
  },
  errorInvalidInputFormat: {
    en: "Wrong format. Unwanted comma?",
    pl: "Błędny format. Niechciany przecinek?",
  },
  safeguard_description: {
    en: "Safeguard is a feature that provides protection or security measures.",
    pl: "Zabezpieczenie to funkcja zapewniająca ochronę lub środki bezpieczeństwa.",
  },
  troops_templates_description: {
    en: "Troops Templates refers to predefined configurations or setups for military units.",
    pl: "Szablony oddziałów odnoszą się do predefiniowanych konfiguracji lub ustawień dla jednostek wojskowych.",
  },
  fill_exact_description: {
    en: "Fill Exact determines whether to fill in exactly the specified criteria.",
    pl: "Wypełnij dokładnie określa, czy ma być wypełnione dokładnie określone kryteria.",
  },
  fill_troops_description: {
    en: "Fill Troops involves filling military units with specified resources or attributes.",
    pl: "Wypełnij oddziały polega na wypełnieniu jednostek wojskowych określonymi zasobami lub cechami.",
  },
  coords_description: {
    en: "Coordinates represent the positions or locations specified by numerical values.",
    pl: "Współrzędne reprezentują pozycje lub lokalizacje określone za pomocą wartości liczbowych.",
  },
  players_description: {
    en: "Players refers to individuals or entities participating in a game or activity.",
    pl: "Gracze odnoszą się do osób lub podmiotów uczestniczących w grze lub działalności.",
  },
  player_ids_description: {
    en: "Player IDs are unique identifiers assigned to each player.",
    pl: "ID graczy to unikalne identyfikatory przypisane do każdego gracza.",
  },
  allies_description: {
    en: "Allies are individuals or groups united for a common purpose or goal.",
    pl: "Sojusznicy to osoby lub grupy zjednoczone w celu wspólnego celu lub celu.",
  },
  ally_ids_description: {
    en: "Ally IDs are unique identifiers assigned to each ally or allied group.",
    pl: "ID sojuszników to unikalne identyfikatory przypisane do każdego sojusznika lub grupy sojuszniczej.",
  },
  ally_tags_description: {
    en: "Ally Tags are descriptive labels or markers associated with allies or allied groups.",
    pl: "Tagi sojuszników to opisowe etykiety lub znaczniki związane z sojusznikami lub grupami sojuszniczymi.",
  },
  exclude_players_description: {
    en: "Exclude Players indicates which players should be omitted or not included.",
    pl: "Wyklucz graczy określa, którzy gracze powinni być pominięci lub nie uwzględnieni.",
  },
  exclude_player_ids_description: {
    en: "Exclude Player IDs are unique identifiers for players to be excluded from consideration.",
    pl: "Wykluczone identyfikatory graczy to unikalne identyfikatory graczy, którzy mają zostać pominięci.",
  },
  exclude_allies_description: {
    en: "Exclude Allies specifies which allies or allied groups should not be taken into account.",
    pl: "Wyklucz sojuszników określa, którzy sojusznicy lub grupy sojusznicze nie powinny być uwzględniane.",
  },
  exclude_ally_tags_description: {
    en: "Exclude Ally Tags indicate descriptive labels or markers for excluded allies or allied groups.",
    pl: "Wyklucz tagi sojuszników wskazują opisowe etykiety lub znaczniki dla wykluczonych sojuszników lub grup sojuszniczych.",
  },
  exclude_ally_ids_description: {
    en: "Exclude Ally IDs are unique identifiers for allies or allied groups to be excluded.",
    pl: "Wykluczone identyfikatory sojuszników to unikalne identyfikatory sojuszników lub grup sojuszniczych, które mają zostać wykluczone.",
  },
  include_barbarians_description: {
    en: "Include Barbarians determines whether to include barbarian units or entities.",
    pl: "Uwzględnij barbarzyńców określa, czy uwzględniać jednostki lub podmioty barbarzyńskie.",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKey>("pl");

  const i18n = (key: string) => {
    return (
      translations[key]?.[language] ??
      `["${key}" is missing in lang "${language}"]`
    );
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
