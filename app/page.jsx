"use client";

import { useState, useEffect } from "react";
import SleepCalculator from "@/components/SleepCalculator";
import LanguageToggle from "@/components/LanguageToggle";
import { Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useLanguageStore from "@/lib/languageStore";
export default function Home() {
  const { translations, lang } = useLanguageStore();
  console.log("Home render, lang:", lang, "title:", translations.title);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Simulate loading time for preferences
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center relative">
            <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              <Clock className="w-6 h-6 text-purple-600" />
              <h1 className="text-2xl font-bold text-purple-600">
                {translations.title}
              </h1>
            </div>
            <div className="absolute right-0">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="pt-16 text-center mb-4">
          <p className="text-base text-muted-foreground">
            {translations.slogan}
          </p>
        </div>
        <SleepCalculator />
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            {translations.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
