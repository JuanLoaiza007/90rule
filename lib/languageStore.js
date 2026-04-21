import { create } from "zustand";
import { en } from "./locales/en";
import { es } from "./locales/es";

const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  
  // 1. Prioridad: Lo que el usuario eligió manualmente antes
  const stored = localStorage.getItem("language");
  if (stored) return stored;

  // 2. Prioridad: Idioma del navegador
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang && browserLang.toLowerCase().startsWith("es")) {
    return "es";
  }

  // 3. Fallback: Inglés
  return "en";
};
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
