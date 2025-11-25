"use client";

import SleepCalculator from "@/components/SleepCalculator";
import LanguageToggle from "@/components/LanguageToggle";
import { Clock } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-8 h-8" />
            <h1 className="text-4xl font-bold">{t("title")}</h1>
            <LanguageToggle />
          </div>
          <p className="text-lg text-muted-foreground">{t("slogan")}</p>
        </div>
        <SleepCalculator t={t} />
      </div>
    </div>
  );
}
