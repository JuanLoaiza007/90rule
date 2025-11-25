"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";

export default function LanguageToggle() {
  const { lang, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(lang === "en" ? "es" : "en");
  };

  return (
    <Button variant="outline" onClick={toggleLanguage} className="ml-4">
      {t("language")}: {lang.toUpperCase()}
    </Button>
  );
}
