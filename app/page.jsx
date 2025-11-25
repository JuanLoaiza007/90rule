"use client";

import { useState, useEffect } from "react";
import SleepCalculator from "@/components/SleepCalculator";
import LanguageToggle from "@/components/LanguageToggle";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/useLanguage";
import { LanguageProvider } from "@/lib/LanguageContext";

function HomeContent() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for preferences
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="flex justify-center mb-2">
              <Skeleton className="h-9 w-20" />
            </div>
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <Skeleton className="h-6 w-56 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-8 h-8" />
            <h1 className="text-4xl font-bold">{t("title")}</h1>
          </div>
          <div className="flex justify-center mb-2">
            <LanguageToggle />
          </div>
          <p className="text-lg text-muted-foreground">{t("slogan")}</p>
        </div>
        <SleepCalculator t={t} />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
