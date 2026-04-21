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
import useSettingsStore from "@/lib/settingsStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsModal() {
  const { translations } = useLanguageStore();
  const { 
    idealBedTime, setIdealBedTime, 
    idealWakeTime, setIdealWakeTime,
    latency, setLatency,
    includeLatencyInDuration, setIncludeLatencyInDuration
  } = useSettingsStore();

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
          {/* Ideal Times Section */}
          <div className="grid gap-4 border-b pb-4">
            <h3 className="text-sm font-bold text-purple-600 uppercase tracking-wider">
              {translations.sleepConfig}
            </h3>
            <div className="flex items-center justify-between">
              <Label className="text-sm">{translations.idealBedTimeSetting}</Label>
              <Input 
                type="time" 
                value={idealBedTime} 
                onChange={(e) => setIdealBedTime(e.target.value)}
                className="w-32 h-9"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">{translations.idealWakeTimeSetting}</Label>
              <Input 
                type="time" 
                value={idealWakeTime} 
                onChange={(e) => setIdealWakeTime(e.target.value)}
                className="w-32 h-9"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm">{translations.latencySetting}</Label>
              <div className="relative">
                <Input 
                  type="number" 
                  value={latency || ""} 
                  placeholder="0"
                  onChange={(e) => setLatency(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-20 h-9 pr-8"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  min
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="latency-toggle" className="text-sm cursor-pointer">
                  {translations.includeLatencyLabel}
                </Label>
                <p className="text-[10px] text-muted-foreground">
                  {includeLatencyInDuration 
                    ? translations.includeLatencyActive 
                    : translations.includeLatencyInactive}
                </p>
              </div>
              <Checkbox
                id="latency-toggle"
                checked={includeLatencyInDuration}
                onCheckedChange={(checked) => setIncludeLatencyInDuration(checked)}
              />
            </div>
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
