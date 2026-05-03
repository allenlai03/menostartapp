import { useState } from "react";
import {
  Flame,
  Thermometer,
  Moon,
  Droplet,
  Zap,
  Activity,
  Check,
  Wifi,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";

interface Symptom {
  id: string;
  icon: typeof Flame;
  label: string;
  color: string;
  bgColor: string;
  type: "count" | "scale" | "hours";
}

const symptoms: Symptom[] = [
  {
    id: "hotFlashes",
    icon: Flame,
    label: "Hot Flashes",
    color: "text-[#9e5757]",
    bgColor: "bg-rose-50",
    type: "count",
  },
  {
    id: "nightSweats",
    icon: Droplet,
    label: "Night Sweats",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    type: "scale",
  },
  {
    id: "temperature",
    icon: Thermometer,
    label: "Temperature",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    type: "scale",
  },
  {
    id: "sleep",
    icon: Moon,
    label: "Sleep Quality",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    type: "hours",
  },
  {
    id: "energy",
    icon: Zap,
    label: "Energy Level",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    type: "scale",
  },
  {
    id: "mood",
    icon: Activity,
    label: "Mood",
    color: "text-[#9e5757]",
    bgColor: "bg-rose-50",
    type: "scale",
  },
];

export function Log() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set(),
  );
  const [symptomValues, setSymptomValues] = useState<Record<string, number>>(
    {},
  );
  const [saved, setSaved] = useState(false);

  const toggleSymptom = (id: string) => {
    if (id === "hotFlashes") return;

    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(id)) {
      newSelected.delete(id);
      const newValues = { ...symptomValues };
      delete newValues[id];
      setSymptomValues(newValues);
    } else {
      newSelected.add(id);
      setSymptomValues({ ...symptomValues, [id]: 5 });
    }
    setSelectedSymptoms(newSelected);
  };

  const updateValue = (id: string, value: number) => {
    setSymptomValues({ ...symptomValues, [id]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-gray-800 tracking-tight">Log Symptoms</h1>
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Ring Detection */}
      <div className="mb-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-200">
        <div className="flex items-center gap-2 mb-3">
          <Wifi className="w-5 h-5 text-[#b76767]" />
          <p className="font-semibold text-gray-800">MenoStart Ring</p>
        </div>
        <p className="text-sm text-gray-600 mb-3">Auto-detected today:</p>
        <div className="flex items-center gap-3 bg-white rounded-xl p-3">
          <div className="w-11 h-11 rounded-lg bg-rose-50 flex items-center justify-center">
            <Flame className="w-5 h-5 text-[#9e5757]" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">
              3 hot flashes
            </p>
            <p className="text-sm text-gray-500">Automatically synced</p>
          </div>
        </div>
      </div>

      {/* Symptoms Grid */}
      <div className="space-y-4 mb-6">
        <p className="text-sm text-gray-600 px-1">
          Tap to select symptoms you're experiencing
        </p>

        <div className="grid grid-cols-2 gap-3">
          {symptoms.map((symptom) => {
            const Icon = symptom.icon;
            const isSelected = selectedSymptoms.has(symptom.id);
            const isHotFlashes = symptom.id === "hotFlashes";

            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                disabled={isHotFlashes}
                className={`p-5 rounded-2xl transition-all ${
                  isHotFlashes
                    ? "opacity-50 cursor-not-allowed bg-white/40"
                    : isSelected
                      ? "bg-white shadow-md scale-[1.02]"
                      : "bg-white/60"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${symptom.bgColor} flex items-center justify-center mb-3 mx-auto relative`}
                >
                  <Icon className={`w-6 h-6 ${symptom.color}`} />
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#b76767] rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  {isHotFlashes && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Wifi className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-800 text-center">
                  {symptom.label}
                </p>
                {isHotFlashes && (
                  <p className="text-sm text-blue-600 text-center mt-1">
                    Auto-tracked
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptom Details */}
      {selectedSymptoms.size > 0 && (
        <div className="space-y-4 mb-6">
          <p className="text-sm text-gray-600 px-1">Rate your symptoms</p>

          {Array.from(selectedSymptoms).map((symptomId) => {
            const symptom = symptoms.find((s) => s.id === symptomId)!;
            const Icon = symptom.icon;
            const value = symptomValues[symptomId] || 5;

            return (
              <div
                key={symptomId}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${symptom.bgColor} flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${symptom.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {symptom.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {symptom.type === "count" && `${value} times`}
                      {symptom.type === "scale" && `Intensity: ${value}/10`}
                      {symptom.type === "hours" && `${value} hours`}
                    </p>
                  </div>
                </div>

                <Slider
                  value={[value]}
                  onValueChange={([newValue]) =>
                    updateValue(symptomId, newValue)
                  }
                  max={symptom.type === "hours" ? 12 : 10}
                  min={symptom.type === "hours" ? 0 : 1}
                  step={1}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Save Button */}
      <div className="fixed bottom-28 left-0 right-0 px-5">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSave}
            disabled={selectedSymptoms.size === 0}
            className={`w-full h-14 rounded-2xl font-semibold text-base shadow-lg transition-all ${
              saved
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gradient-to-r from-[#c98484] to-[#b76767] hover:from-[#a55757] hover:to-[#9e5757]"
            }`}
          >
            {saved ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Saved Successfully!
              </span>
            ) : (
              "Save Today's Entry"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
