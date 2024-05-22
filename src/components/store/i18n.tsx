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
  exclude_player_ids: { en: "Exclude Player IDs", pl: "Wyklucz graczy (ID)" },
  exclude_allies: { en: "Exclude Allies", pl: "Wyklucz plemiona" },
  exclude_ally_tags: { en: "Exclude Ally Tags", pl: "Wyklucz tagi plemion" },
  exclude_ally_ids: { en: "Exclude Ally IDs", pl: "Wyklucz plemiona (ID)" },
  include_barbarians: {
    en: "Include Barbarians",
    pl: "Uwzględnij wioski barbarzyńskie",
  },
  boundaries_circle: { en: "Boundaries (Circle)", pl: "Granice (koło)" },
  boundaries_box: { en: "Boundaries (Box)", pl: "Granice (prostokąt)" },
  blocking_enabled: { en: "Blocking Enabled", pl: "Blokowanie" },
  blocking_local: { en: "Local Blocking", pl: "Blokada lokalna" },
  blocking_global: { en: "Global Blocking", pl: "Blokada globalna" },
  skip_night_bonus: { en: "Skip Night Bonus", pl: "Pomiń bonus nocny" },
  date_ranges: { en: "Date Ranges", pl: "Zakresy dat" },
  forum_config: { en: "Forum config", pl: "Konfigurazja z forum" },
  changing_village_enabled: {
    en: "Changing Village ",
    pl: "Zmiana wioski",
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
    pl: "Błędne koordy. Czy format to XXX|YYY,XXX|ZZZ?",
  },
  errorNumberInvalid: {
    en: "Wrong ID. Format is 111111,222222?",
    pl: "Błędne ID. Czy format to 11111,22222?",
  },
  safeguard_description: {
    en: "Securing the specified number of troops in the village. The sealer will check if there are more than the specified number of troops in the village, if not, it will select other units.",
    pl: "Zabezpieczenie podanej ilości wojsk w wiosce. Fejkomat będzie sprawdzał, czy w wiosce jest więcej niż określona liczba wojsk, jeśli nie, to dobierze inne jednostki.",
  },
  troops_templates_description: {
    en: "The army templates refer to the templates that the fey should use. When filling out a template, set a 'default' configuration (e.g. Taran: 1).",
    pl: "Szablony wojsk odnoszą się do szablonów, z jakich powinien korzystać fejkomat. Wypełniając szablon, ustawiamy 'domyślną' konfigurację (np. Taran: 1)",
  },
  fill_exact_description: {
    en: "Fill in exactly specifies to fill in exactly as the template predicts.",
    pl: "Wypełnij dokładnie określa, czy ma być wypełnione dokładnie tak, jak przewiduje szablon.",
  },
  fill_troops_description: {
    en: "Decide which troops should be filled with the fey.",
    pl: "Zdecyduj, jakimi typami wojsk powinien zostać wypełniony fejkomat.",
  },
  coords_description: {
    en: "Coordinates (coordinates) of the villages that should be feinted. Villages should be separated by commas (e.g. 555|134,512|442).",
    pl: "Współrzędne (koordy) wiosek, które powinny być fejkowane. Wioski powinny być oddzielone przecinkami (np. 555|134,512|442)",
  },
  players_description: {
    en: "Full nicknames of players who should be attacked (e.g. Hermitowski,slovik). Fejkomat will find and set as targets the villages of the specified players.",
    pl: "Pełne nicki graczy, którzy powinni być atakowani (np. Hermitowski,slovik). Fejkomat znajdzie i będzie ustawiał jako cele wioski podanych graczy.",
  },
  player_ids_description: {
    en: "Player IDs are unique identifiers for each player (e.g. 921378123). Pheykomat will find and set the villages of the specified players as targets.",
    pl: "ID graczy to unikatowe identyfikatory każdego gracza (np. 921378123). Fejkomat znajdzie i będzie ustawiał jako cele wioski podanych graczy.",
  },
  allies_description: {
    en: "The full names of the tribes that should be attacked (e.g. Some tribe 123,Support team plemi0na). Fejkomat will find and set as targets the villages of the players belonging to the tribe.",
    pl: "Pełne nazwy plemion, które powinny być atakowane (np. Jakieś plemię 123,Zespół supportu plemi0na). Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  ally_ids_description: {
    en: "Tribe IDs are unique identifiers for each tribe (e.g. 141). Pheykomat will find and set as targets the villages of the players belonging to the tribe.",
    pl: "ID plemienia to unikatowe identyfikatory każdego plemienia (np. 141). Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  ally_tags_description: {
    en: "Allied tags are 'short names' of tribes. The fey will find and set as targets the villages of the players belonging to the tribe.",
    pl: "Tagi sojuszników to 'krótkie nazwy' plemion. Fejkomat znajdzie i będzie ustawiał jako cele wioski nalezących do plemienia graczy.",
  },
  exclude_players_description: {
    en: "Players who are excluded will not be in the feycomat as targets. Players/lemons added here will be excluded from the feycomat and WILL NOT be attacked. ",
    pl: "Gracze, którzy są wykluczeni nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  exclude_player_ids_description: {
    en: "Players (their IDs) who are excluded will not be in the feycomat as targets. Players/players added here will be excluded from the feycomat and WILL NOT be attacked. ",
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
    en: "The tags of tribes that are excluded will not be in the feycomat as targets. Players/tribes added here will be excluded from the feycomat and WILL NOT be attacked. ",
    pl: "Tagi plemion, które są wykluczone nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani. ",
  },
  exclude_ally_ids_description: {
    en: "Excluded alliance identifiers are the unique identifiers of the allies or alliance groups to be excluded.",
    pl: "Wykluczone identyfikatory plemion, które nie będą się znajdować w fejkomacie jako cele. Gracze/plemiona dodane tutaj będą wykluczeni z fejkomatu i NIE BĘDĄ atakowani.",
  },
  include_barbarians_description: {
    en: "Barbadian villages can be added to the feycom as targets. The setting determines whether they should be selected as targets. If selected, barbarian villages will be in the target pool.",
    pl: "Do fejkomatu mozna dodac jako cele wioski barbarzynskie. To ustawienie decyduje, czy powinny byc wybierane jako cele. Jezli zaznaczone, wioski barbarzynskie będą w puli celów.",
  },
  changing_village_enabled_description: {
    en: "Change the village after every peycomat call. Speeds up the fejking process.",
    pl: "Zmieniaj wioskę po kadym wywołaniu fejkomatu. Przyspiesza proces fejkowania.",
  },
  skip_night_bonus_description: {
    en: "Bypass night bonus (according to server settings). If checked, attacks will be set to hours AFTER the night bonus.",
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
    en: "Fejkomat is a script for the game Tribes, automating the sending of attacks from the square. It allows you to select random villages from a preset pool, select troops according to criteria, bypass the night bonus, schedule attacks on specific days or times, and target villages of specific players. The script can use army templates ('basics') and select units up to a limit of spooks ('complements'). It works in two stages: first it selects troops and then draws a village to attack. The fey saves a lot of time in Tribes, is easy to set up and gives you a lot of control over the attacks you send. However, it still requires you to make strategic decisions about targets and troops. ",
    pl: "Fejkomat to skrypt do gry Plemiona, automatyzujący wysyłanie ataków z placu. Pozwala wybierać losowe wioski z zadanej puli, dobierać wojska według kryteriów, omijać bonus nocny, planować ataki w określonych dniach lub porach oraz celować w wioski konkretnych graczy. Skrypt potrafi stosować szablony wojsk ('podstawki') i dobierać jednostki do limitu straszaków ('dopełnienie'). Działa dwuetapowo: najpierw wybiera wojska, a potem losuje wioskę do ataku. Fejkomat znacznie oszczędza czas w Plemionach, jest łatwy w ustawieniu i daje dużą kontrolę nad wysyłanymi atakami. Nadal jednak wymaga od Ciebie podejmowania strategicznych decyzji o celach i wojskach. ",
  },
  copyScript: {
    en: "Copy faking script",
    pl: "Kopiuj skrypt",
  },
  accept: {
    en: "Accept",
    pl: "Akceptuj",
  },
  reject: {
    en: "Reject",
    pl: "Odrzuć",
  },
  cookieContestText: {
    en: "We use cookies and analytics to improve your experience. By using our site, you consent to this.",
    pl: "Używamy plików cookie i analityki, aby poprawić Twoje wrażenia. Korzystając z tej witryny, wyrażasz na to zgodę.",
  },
  buyMeCoffee: {
    pl: "Kup mi kawkie!",
    en: "Buy me coffee",
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
