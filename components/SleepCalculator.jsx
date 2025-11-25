"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Moon, Clock } from "lucide-react";
import { calculateWakeUpTimes, formatWakeTime } from "@/lib/sleepCalculator";

function WakeUpSuggestion({ suggestion, use12Hour }) {
  const { cycles, totalMinutes, wakeTime } = suggestion;

  let badgeVariant = "destructive"; // red
  if (cycles >= 6) badgeVariant = "default"; // green-500
  else if (cycles === 5)
    badgeVariant = "secondary"; // lime-500, usar secondary que es bg-secondary
  else if (cycles === 4) badgeVariant = "outline"; // yellow-500, usar outline que es bg-yellow?

  // Necesito customizar colores, usar className
  const getBadgeClass = () => {
    if (cycles >= 6) return "bg-green-500 text-white";
    if (cycles === 5) return "bg-lime-500 text-white";
    if (cycles === 4) return "bg-yellow-500 text-black";
    return "bg-red-500 text-white";
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-medium">
          {formatWakeTime(wakeTime, use12Hour)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {totalMinutes} min
        </span>
        <Badge className={getBadgeClass()}>
          {cycles} ciclo{cycles !== 1 ? "s" : ""}
        </Badge>
      </div>
    </div>
  );
}

export default function SleepCalculator() {
  const [bedTime, setBedTime] = useState("22:00");
  const [latency, setLatency] = useState(15);
  const [use12Hour, setUse12Hour] = useState(false);

  const suggestions = useMemo(() => {
    const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(bedTime);
    const isValidLatency = latency >= 0 && latency <= 120;

    if (isValidTime && isValidLatency) {
      return calculateWakeUpTimes(bedTime, latency);
    }
    return [];
  }, [bedTime, latency]);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Configuración del Sueño
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bedTime">Hora de acostarte (HH:MM)</Label>
            <Input
              id="bedTime"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="latency">Minutos para conciliar el sueño</Label>
            <Input
              id="latency"
              type="number"
              min="0"
              max="120"
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Formato de hora</Label>
            <Toggle
              pressed={use12Hour}
              onPressedChange={setUse12Hour}
              aria-label="Toggle 12/24 hour format"
            >
              {use12Hour ? "12h" : "24h"}
            </Toggle>
          </div>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horas Sugeridas para Despertarte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <WakeUpSuggestion
                  key={index}
                  suggestion={suggestion}
                  use12Hour={use12Hour}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
