import SleepCalculator from "@/components/SleepCalculator";
import { Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-8 h-8" />
            <h1 className="text-4xl font-bold">90Rule</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Wake up refreshed, conquer your day – one perfect sleep cycle at a
            time.
          </p>
        </div>
        <SleepCalculator />
      </div>
    </div>
  );
}
