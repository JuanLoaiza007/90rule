"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CycleInfoDialog({
  open,
  onOpenChange,
  cycles,
  translations,
}) {
  const effects = translations?.cycleEffects?.[cycles];

  if (!effects) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>
            <span className="text-purple-600">
              {cycles}{" "}
              {cycles === 1 ? translations.cycles : translations.cyclesPlural}
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm text-primary">
                Efectos a corto plazo:
              </h4>
              <p className="text-sm text-primary">{effects.short}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-primary">
                Efectos a largo plazo:
              </h4>
              <p className="text-sm text-primary">{effects.long}</p>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
