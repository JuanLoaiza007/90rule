"use client";

import { useState, useCallback } from "react";
import { en } from "./locales/en";
import { es } from "./locales/es";

const languages = { en, es };

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "en";
    }
    return "en";
  });

  const setLanguage = (newLang) => {
    if (languages[newLang]) {
      setLang(newLang);
      localStorage.setItem("language", newLang);
    }
  };

  const t = useCallback((key) => languages[lang][key] || key, [lang]);

  return { lang, setLanguage, t };
}
