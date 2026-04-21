"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, Moon, Sun, Monitor, Languages } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import useLanguageStore from "@/lib/languageStore";
import { Label } from "@/components/ui/label";

export default function SettingsModal() {
  const { translations } = useLanguageStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30">
          <Settings className="w-5 h-5 text-purple-600" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {translations.settings}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">{translations.language}</Label>
              <p className="text-xs text-muted-foreground">
                {translations.languageSub}
              </p>
            </div>
            <LanguageToggle />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">{translations.appearance}</Label>
              <p className="text-xs text-muted-foreground">
                {translations.appearanceSub}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
