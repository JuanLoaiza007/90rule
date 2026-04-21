"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Moon, Clock, RefreshCw, Sparkles } from "lucide-react";
import { calculateWakeUpTimes, calculateBedTimes, formatWakeTime } from "@/lib/sleepCalculator";
import useLanguageStore from "@/lib/languageStore";
import useSettingsStore from "@/lib/settingsStore";
import CycleInfoDialog from "@/components/CycleInfoDialog";

function WakeUpSuggestion({
  suggestion,
  use12Hour,
  showInHours,
  onToggleFormat,
  onToggleTime,
  onClickBadge,
  translations,
}) {
  const { cycles, totalMinutes, wakeTime } = suggestion;
  const isRecommended = cycles === 5 || cycles === 6;

  const getBadgeClass = () => {
    if (cycles >= 6) return "bg-green-600 text-white";
    if (cycles === 5) return "bg-emerald-500 text-white";
    if (cycles === 4) return "bg-amber-500 text-white";
    return "bg-rose-500 text-white";
  };

  const displayTime = showInHours
    ? `${(totalMinutes / 60).toFixed(1)}${translations.hour}`
    : `${totalMinutes} ${translations.min}`;

  return (
    <div
      className={`flex items-center justify-between p-3 border rounded-lg transition-all ${
        isRecommended
          ? "border-purple-400 bg-purple-50/50 dark:bg-purple-900/10 shadow-sm"
          : "hover:bg-accent/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span
              className="font-bold text-lg cursor-pointer hover:text-purple-600 transition-colors"
              onClick={onToggleFormat}
            >
              {formatWakeTime(wakeTime, use12Hour)}
            </span>
          </div>
          {isRecommended && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1">
              <Sparkles className="w-2 h-2" />
              {translations.recommended}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="text-xs text-muted-foreground font-medium cursor-pointer hover:underline"
          onClick={onToggleTime}
        >
          {displayTime}
        </span>
        <Badge
          className={`${getBadgeClass()} cursor-pointer min-w-20 justify-center h-8 text-xs font-semibold`}
          onClick={() => onClickBadge(cycles)}
        >
          {cycles}{" "}
          {cycles === 1 ? translations.cycles : translations.cyclesPlural}
        </Badge>
      </div>
    </div>
  );
}

export default function SleepCalculator() {
  const { translations } = useLanguageStore();
  const { 
    idealBedTime, setIdealBedTime, 
    idealWakeTime, setIdealWakeTime,
    latency, setLatency,
    use12Hour, setUse12Hour,
    showInHours, setShowInHours
  } = useSettingsStore();

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("calcMode") || "wakeUp";
    }
    return "wakeUp";
  });

  const [bedTime, setBedTime] = useState(mode === "wakeUp" ? idealBedTime : idealWakeTime);
  
  const [selectedCycles, setSelectedCycles] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Guardar modo y sincronizar con la hora ideal del store
  useEffect(() => {
    localStorage.setItem("calcMode", mode);
    setBedTime(mode === "wakeUp" ? idealBedTime : idealWakeTime);
  }, [mode, idealBedTime, idealWakeTime]);

  // Si el usuario cambia la hora manualmente en el input principal, 
  // la guardamos como su nueva "ideal" para ese modo.
  const handleTimeChange = (newTime) => {
    setBedTime(newTime);
    if (mode === "wakeUp") setIdealBedTime(newTime);
    else setIdealWakeTime(newTime);
  };

  const suggestions = useMemo(() => {
    const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(bedTime);
    const isValidLatency = latency >= 0 && latency <= 120;

    if (isValidTime && isValidLatency) {
      return mode === "wakeUp"
        ? calculateWakeUpTimes(bedTime, latency)
        : calculateBedTimes(bedTime, latency);
    }
    return [];
  }, [bedTime, latency, mode]);

  const handleClickBadge = (cycles) => {
    setSelectedCycles(cycles);
    setOpenDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600">{translations.sleepConfig}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>{translations.mode}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 p-1 bg-muted/30 rounded-2xl border-2 border-muted/50 cursor-pointer" onClick={() => setMode(mode === "wakeUp" ? "bedtime" : "wakeUp")}>
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all duration-400 ease-out rounded-xl relative pointer-events-none ${
                  mode === "wakeUp"
                    ? "flex-[1.2] py-4 bg-purple-600 text-white shadow-lg shadow-purple-500/30 border-none"
                    : "flex-[0.8] py-2 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border-transparent opacity-60"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Moon
                    className={`w-3.5 h-3.5 transition-all ${
                      mode === "wakeUp" ? "scale-110" : "opacity-50"
                    }`}
                  />
                  <span
                    className={`font-bold transition-all ${
                      mode === "wakeUp" ? "text-sm" : "text-xs"
                    }`}
                  >
                    {translations.calculateWakeUp}
                  </span>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`transition-all duration-400 ease-out rounded-xl relative pointer-events-none ${
                  mode === "bedtime"
                    ? "flex-[1.2] py-4 bg-purple-600 text-white shadow-lg shadow-purple-500/30 border-none"
                    : "flex-[0.8] py-2 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border-transparent opacity-60"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <Clock
                    className={`w-3.5 h-3.5 transition-all ${
                      mode === "bedtime" ? "scale-110" : "opacity-50"
                    }`}
                  />
                  <span
                    className={`font-bold transition-all ${
                      mode === "bedtime" ? "text-sm" : "text-xs"
                    }`}
                  >
                    {translations.calculateBedtime}
                  </span>
                </div>
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Label
              htmlFor="bedTime"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-purple-600" />
              {mode === "wakeUp"
                ? translations.bedTimeLabel
                : translations.wakeTimeLabel}
            </Label>
            <div className="flex gap-2">
              <Input
                id="bedTime"
                type="time"
                value={bedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="h-12 text-lg font-medium rounded-xl border-2 focus-visible:ring-purple-500"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-xl border-2 shrink-0"
                onClick={() => setBedTime(getCurrentTime())}
                title={translations.sync}
              >
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="latency"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              {translations.latency}
            </Label>
            <div className="relative">
              <Input
                id="latency"
                type="number"
                min="0"
                max="120"
                value={latency || ""}
                placeholder="0"
                onChange={(e) => {
                  setLatency(e.target.value === "" ? 0 : Number(e.target.value));
                }}
                className="h-12 pl-4 pr-12 text-lg font-medium rounded-xl border-2 focus-visible:ring-purple-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                {translations.min}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600">
                {mode === "wakeUp"
                  ? translations.suggestedWakeUpTimes
                  : translations.suggestedBedtimeTimes}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <WakeUpSuggestion
                  key={index}
                  suggestion={suggestion}
                  use12Hour={use12Hour}
                  showInHours={showInHours}
                  onToggleFormat={() => setUse12Hour(!use12Hour)}
                  onToggleTime={() => setShowInHours(!showInHours)}
                  onClickBadge={handleClickBadge}
                  translations={translations}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <CycleInfoDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        cycles={selectedCycles}
        translations={translations}
      />
    </div>
  );
}
