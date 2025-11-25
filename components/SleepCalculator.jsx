"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Moon, Clock, RefreshCw, Sparkles } from "lucide-react";
import { calculateWakeUpTimes, formatWakeTime } from "@/lib/sleepCalculator";
import useLanguageStore from "@/lib/languageStore";
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

  const getBadgeClass = () => {
    if (cycles >= 6) return "bg-green-500 text-white";
    if (cycles === 5) return "bg-lime-500 text-white";
    if (cycles === 4) return "bg-yellow-500 text-black";
    return "bg-red-500 text-white";
  };

  const displayTime = showInHours
    ? `${(totalMinutes / 60).toFixed(1)}${translations.hour}`
    : `${totalMinutes} ${translations.min}`;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span
          className="font-medium cursor-pointer hover:underline"
          onClick={onToggleFormat}
        >
          {formatWakeTime(wakeTime, use12Hour)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-sm text-primary cursor-pointer hover:underline"
          onClick={onToggleTime}
        >
          {displayTime}
        </span>
        <Badge
          className={`${getBadgeClass()} cursor-pointer w-16 justify-center`}
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
  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const [bedTime, setBedTime] = useState(() => getCurrentTime());
  const [latency, setLatency] = useState(15);
  const [use12Hour, setUse12Hour] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("use12Hour") === "true";
    }
    return false;
  });
  const [showInHours, setShowInHours] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("showInHours") === "true";
    }
    return false;
  });
  const [selectedCycles, setSelectedCycles] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    localStorage.setItem("use12Hour", use12Hour);
  }, [use12Hour]);

  useEffect(() => {
    localStorage.setItem("showInHours", showInHours);
  }, [showInHours]);

  const suggestions = useMemo(() => {
    const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(bedTime);
    const isValidLatency = latency >= 0 && latency <= 120;

    if (isValidTime && isValidLatency) {
      return calculateWakeUpTimes(bedTime, latency);
    }
    return [];
  }, [bedTime, latency]);

  const handleClickBadge = (cycles) => {
    setSelectedCycles(cycles);
    setOpenDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-600" />
            <span className="text-purple-600">{translations.sleepConfig}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bedTime" className="text-primary">
              {translations.bedTime}
            </Label>
            <div className="flex gap-2 mt-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setBedTime(getCurrentTime())}
                title={translations.sync}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Input
                id="bedTime"
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="latency" className="text-primary">
              {translations.latency}
            </Label>
            <Input
              id="latency"
              type="number"
              min="0"
              max="120"
              value={latency || ""}
              placeholder="0"
              onChange={(e) => {
                const val = e.target.value;
                setLatency(val === "" ? 0 : Number(val));
              }}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600">
                {translations.suggestedTimes}
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
