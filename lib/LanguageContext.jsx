"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { en } from "./locales/en";
import { es } from "./locales/es";

const languages = { en, es };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const setLanguage = useCallback((newLang) => {
    console.log("setLanguage called with:", newLang);
    if (languages[newLang]) {
      console.log("Setting language to:", newLang);
      setLang(newLang);
      localStorage.setItem("language", newLang);
      console.log("Language changed in real-time");
    } else {
      console.log("Invalid language:", newLang);
    }
  }, []);

  const t = useCallback(
    (key) => {
      console.log("t called with key:", key, "lang:", lang);
      return languages[lang][key] || key;
    },
    [lang]
  );

  useEffect(() => {
    console.log("LanguageContext lang changed to:", lang);
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
