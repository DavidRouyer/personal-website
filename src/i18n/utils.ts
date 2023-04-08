import { match } from "@formatjs/intl-localematcher";
import { parse } from "./accept";
import { ui, defaultLang } from "./ui";

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
};

export const useTranslations = (lang: keyof typeof ui) => {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
};

export const resolveLanguage = (acceptLanguage: string) => {
  const parsedLanguages = parse(acceptLanguage, [], {
    type: "accept-language",
    prefixMatch: true,
  });
  return match(parsedLanguages, ["fr", "en"], "en");
};
