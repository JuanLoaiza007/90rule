"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/useLanguage";

export default function LanguageToggle() {
  const { lang, setLanguage } = useLanguage();

  return (
    <Select value={lang} onValueChange={setLanguage}>
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
