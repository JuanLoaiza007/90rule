import { create } from "zustand";
import { en } from "./locales/en";
import { es } from "./locales/es";

const getInitialLang = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("language") || "en"
    : "en";
const getInitialTranslations = () => (getInitialLang() === "es" ? es : en);

const useLanguageStore = create((set) => ({
  lang: getInitialLang(),
  translations: getInitialTranslations(),
  setLanguage: (newLang) => {
    if (["en", "es"].includes(newLang)) {
      const newTranslations = newLang === "es" ? es : en;
      set({ lang: newLang, translations: newTranslations });
      localStorage.setItem("language", newLang);
      document.documentElement.lang = newLang;
    }
  },
}));

export default useLanguageStore;
