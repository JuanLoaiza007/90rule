"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useLanguageStore from "@/lib/languageStore";

export default function LanguageToggle() {
  const { lang, setLanguage } = useLanguageStore();
  console.log(
    "LanguageToggle render, lang:",
    lang,
    "setLanguage:",
    typeof setLanguage
  );

  const handleValueChange = (value) => {
    console.log("Select onValueChange called with:", value);
    setLanguage(value);
  };

  return (
    <Select value={lang} onValueChange={handleValueChange}>
      <SelectTrigger className="w-20">
        <SelectValue>{lang.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN - English</SelectItem>
        <SelectItem value="es">ES - Español</SelectItem>
      </SelectContent>
    </Select>
  );
}
