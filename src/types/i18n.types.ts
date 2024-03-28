export type LanguageKey = "en" | "pl";

export interface I18nContextType {
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  i18n: (key: string) => string;
}

export interface TranslationMap {
  [key: string]: {
    [lang in LanguageKey]?: string;
  };
}
