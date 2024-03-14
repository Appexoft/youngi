import i18next, {
  LanguageDetectorModule,
  StringMap,
  TFunction,
  TOptions,
  i18n,
} from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationBase,
} from "react-i18next";
import { getLocales } from "react-native-localize";
import { format as formatDate } from "date-fns";
import { TranslationKeys } from "../types/translations";
import * as Locales from "date-fns/locale";

const translationsJson = {
  en: require("./translations/en.json"),
  he: require("./translations/he.json"),
};

const defaultLanguage = "he";

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  async: true,
  detect: (callback: (lng?: string) => void) => {
    const locales = getLocales();
    const currentLocale = locales[0];
    const isHebrew =
      currentLocale.languageCode === "he" || currentLocale.countryCode === "IL";

    // check if the user has set their phone to Hebrew
    if (isHebrew) {
      callback("he");
    } else {
      callback(defaultLanguage);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    debug: __DEV__,
    resources: translationsJson,
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (value instanceof Date) {
          const languageTag = lng?.replace("-", "") || "enGB";
          return formatDate(value, format || "P", {
            locale:
              Locales[languageTag as keyof typeof Locales] || Locales.enGB,
          });
        }
        return value;
      },
    },
  });

// specialize useTranslation hook to use generated translation keys
export interface CustomTFunction {
  (key: TranslationKeys, options?: TOptions<StringMap> | string): string;
}

type UseTranslationResponse = [TFunction, i18n, boolean] & {
  t: CustomTFunction;
  i18n: i18n;
  ready: boolean;
};

export const useTranslation = (
  ...params: Parameters<typeof useTranslationBase>
): UseTranslationResponse => useTranslationBase(...params);

export const useHebrew = (): boolean => {
  const locales = getLocales();
  const currentLocale = locales[0];

  // return (
  //   currentLocale.languageCode === "he" || currentLocale.countryCode === "IL"
  // );
  return true;
};
