"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useLanguageStore from "@/lib/languageStore";
import { Globe } from "lucide-react";

export default function LanguageModal() {
  const { lang, setLanguage, translations } = useLanguageStore();

  const getDynamicFlag = () => {
    if (typeof window === "undefined") return "🇪🇸";
    const browserLang = navigator.language || "";
    
    // Si el idioma es inglés, usamos USA
    if (lang === "en") return "🇺🇸";
    
    // Si es español, intentamos detectar el país
    if (lang === "es") {
      const region = browserLang.split("-")[1]?.toUpperCase();
      const countryFlags = {
        "MX": "🇲🇽", "CO": "🇨🇴", "AR": "🇦🇷", "CL": "🇨🇱", "PE": "🇵🇪", 
        "VE": "🇻🇪", "EC": "🇪🇨", "GT": "🇬🇹", "CU": "🇨🇺", "BO": "🇧🇴", 
        "DO": "🇩🇴", "HN": "🇭🇳", "PY": "🇵🇾", "SV": "🇸🇻", "NI": "🇳🇮", 
        "CR": "🇨🇷", "PA": "🇵🇦", "UY": "🇺🇾", "PR": "🇵🇷", "ES": "🇪🇸"
      };
      return countryFlags[region] || "🇪🇸";
    }
    return "🌐";
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
  ];

  const currentFlag = getDynamicFlag();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-xl">
          {currentFlag}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {translations.language}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {languages.map((l) => (
            <Button
              key={l.code}
              variant={lang === l.code ? "default" : "outline"}
              className="justify-start gap-3 h-12 text-base"
              onClick={() => setLanguage(l.code)}
            >
              <span className="text-2xl">{l.flag}</span>
              <span>{l.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
