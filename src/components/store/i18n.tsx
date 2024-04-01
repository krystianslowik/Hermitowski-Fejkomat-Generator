import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  type LanguageKey,
  type I18nContextType,
  type TranslationMap,
} from "../../types/i18n.types";

const translations: TranslationMap = {
  safeguard: { en: "Safeguard", pl: "Zablokowane jednostki" },
  troops_templates: { en: "Troops Templates", pl: "Szablony wojsk" },
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
  errorCoordsInvalid: {
    en: "Wrong coords. Format is XXX|YYY?",
    pl: "Błędne koordy. Czy format to XXX|YYY?",
  },
  errorNumberInvalid: {
    en: "Wrong ID. Format is 111111,222222?",
    pl: "Błędne ID. Czy format to 11111,22222?",
  },
  safeguard_description: {
    en: "Safeguard is a feature that provides protection for a specified amount of troops in the village.",
    pl: "Zabezpieczenie podanej ilości wojsk w wiosce. Fejkomat będzie sprawdzał, czy w wiosce jest więcej niż określona liczba wojsk, jeśli nie, to dobierze inne jednostki.",
  },
  troops_templates_description: {
    en: "Troops Templates refers to predefined configurations or setups for military units.",
    pl: "Szablony wojsk odnoszą się do szablonów, z jakich powinien korzystać fejkomat. Wypełniając szablon, ustawiamy 'domyślną' konfigurację (np. Taran: 1)",
  },
  fill_exact_description: {
    en: "Fill Exact determines whether to fill in exactly the specified criteria.",
    pl: "Wypełnij dokładnie określa, czy ma być wypełnione dokładnie określone kryteria.",
  },
  fill_troops_description: {
    en: "Decide which troops should be filled with the fey.",
    pl: "Zdecyduj, jakimi typami wojsk powinien zostać wypełniony fejkomat.",
  },
  coords_description: {
    en: "Coordinates represent the positions or locations specified by numerical values.",
    pl: "Współrzędne (koordy) wiosek, które powinny być fejkowane. Wioski powinny być oddzielone przecinkami (np. 555|134,512|442)",
  },
  players_description: {
    en: "Players refers to individuals or entities participating in a game or activity.",
    pl: "Pełne nicki graczy, którzy powinni być atakowani (np. Hermitowski,slovik). Fejkomat znajdzie i będzie ustawiał jako cele wioski podanych graczy.",
  },
  player_ids_description: {
    en: "Player IDs are unique identifiers assigned to each player. Faking script will fill villages of this player into config.",
    pl: "ID graczy to unikatowe identyfikatory każdego gracza (np. 921378123). Fejkomat znajdzie i będzie ustawiał jako cele wioski podanych graczy.",
  },
  allies_description: {
    en: "Allies are individuals or groups united for a common purpose or goal.",
    pl: "Pełne nazwy plemion, które powinny być atakowane (np. Jakieś plemię 123,Zespół supportu plemi0na). Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  ally_ids_description: {
    en: "Ally IDs are unique identifiers assigned to each ally or allied group.",
    pl: "ID plemienia to unikatowe identyfikatory każdego plemienia (np. 141). Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  ally_tags_description: {
    en: "Ally Tags are descriptive labels or markers associated with allies or allied groups.",
    pl: "Tagi sojuszników to 'krótkie nazwy' plemion. Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  exclude_players_description: {
    en: "Exclude Players indicates which players should be omitted or not included.",
    pl: "Gracze, którzy są wykluczeni nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  exclude_player_ids_description: {
    en: "Players who are excluded will not be in the feycomat as targets. Players/tribes added here will be excluded from the feycomat and WILL NOT be attacked. ",
    pl: "Gracze (ich ID), którzy są wykluczeni nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  exclude_allies_description: {
    en: "Names of tribes that are excluded will not be in fejkomat as targets. Players/tribes added here will be excluded from fejkomat and WILL NOT be attacked. ",
    pl: "Nazwy plemion, które są wykluczone nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  date_ranges_description: {
    en: "Date ranges in which attacks should take place. You can set specific dates or only times when attacks should occur. ",
    pl: "Zakresy dat, w których powinny odbywać się ataki. Mozna ustawić konkretne daty lub wyłącznie godziny, w których powinny dochodzić ataki. ",
  },
  exclude_ally_tags_description: {
    en: "Exclude Ally Tags indicate descriptive labels or markers for excluded allies or allied groups.",
    pl: "Tagi plemion, które są wykluczone nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  exclude_ally_ids_description: {
    en: "Exclude Ally IDs are unique identifiers for allies or allied groups to be excluded.",
    pl: "Wykluczone identyfikatory sojuszników to unikalne identyfikatory sojuszników lub grup sojuszniczych, które mają zostać wykluczone.",
  },
  include_barbarians_description: {
    en: "Include Barbarians determines whether to include barbarian units or entities.",
    pl: "Uwzględnij barbarzyńców określa, czy uwzględniać jednostki lub podmioty barbarzyńskie.",
  },
  changing_village_enabled_description: {
    en: "Change the village after every peycomat call. Speeds up the fejking process.",
    pl: "Zmieniaj wioskę po kadym wywołaniu fejkomatu. Przyspiesza proces fejkowania.",
  },
  skip_night_bonus_description: {
    en: "Skip the night bonus (according to server settings).",
    pl: "Omijaj bonus nocny (zgodny z ustawieniami serwera). Jeśli zaznaczone, ataki będą ustawiane na godziny POZA bonusem nocnym.",
  },
  spear: { en: "Spear", pl: "Pikinier" },
  sword: { en: "Sword", pl: "Miecznik" },
  axe: { en: "Axe", pl: "Topornik" },
  archer: { en: "Archer", pl: "Łucznik" },
  spy: { en: "Scout", pl: "Zwiadowca" },
  light: { en: "Light Cavalry", pl: "LK" },
  marcher: { en: "Mounted Archer", pl: "ŁNK" },
  heavy: { en: "Heavy Cavalry", pl: "CK" },
  ram: { en: "Ram", pl: "Taran" },
  catapult: { en: "Catapult", pl: "Katapulta" },
  snob: { en: "Snob", pl: "Grubas" },
  knight: { en: "Knight", pl: "Rycerz" },
  removeTemplate: { en: "Remove template", pl: "Usuń szablon" },
  cancel: { en: "Cancel", pl: "Zamknij" },
  remove: { en: "Remove", pl: "Usuń" },
  addTemplate: { en: "Add template", pl: "Dodaj szablon" },
  saveTemplate: { en: "Save template", pl: "Zapisz szablon" },
  addDateRange: { en: "Add date range", pl: "Dodaj zakres" },
  add: { en: "Add", pl: "Dodaj" },
  availableSoon: {
    pl: "Wkrótce dostępne",
    en: "Available soon",
  },
  minimumOneFieldNeeded: {
    en: "Minimum one field is required!",
    pl: "Przynajmniej jedna jednostka musi być wypełniona!",
  },
  useDateTime: {
    en: "Add exact date",
    pl: "Dodaj konkretną datę",
  },
  outputTitle: {
    en: "What is Faking script?",
    pl: "Czym jest fejkomat?",
  },
  rawOutputTitle: {
    en: "Raw output:",
    pl: "Surowy skrypt:",
  },
  outputDescription: {
    en: "The script is designed for automating form field completion in a strategic game setting, focusing on selecting troops and coordinates for attacks. Its primary functionality is centered on the battlefield interface, ensuring users are correctly positioned for their strategic actions. Should a village fall out of a dynamic group, the script attempts to navigate to the next available village within that group.    ",
    pl: "Skrypt przeznaczony jest do automatyzacji wypełniania pól formularzy w strategicznych ustawieniach gry, koncentrując się na wyborze oddziałów i współrzędnych do ataków. Jego podstawowa funkcjonalność koncentruje się na interfejsie pola bitwy, zapewniając użytkownikom prawidłową pozycję do ich strategicznych działań. Jeśli wioska wypadnie z dynamicznej grupy, skrypt spróbuje przejść do następnej dostępnej wioski w tej grupie.    ",
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

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
