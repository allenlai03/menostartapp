import { Cloud, Droplets, Moon, Apple, Zap, Leaf, Wind, Heart, TrendingDown } from "lucide-react";
import { Card } from "../components/ui/card";

interface Recommendation {
  id: string;
  symptom: string;
  icon: typeof Cloud;
  color: string;
  bgColor: string;
  tips: string[];
}

const recommendations: Recommendation[] = [
  {
    id: "hotFlashes",
    symptom: "Hot Flashes",
    icon: Cloud,
    color: "text-[#9e5757]",
    bgColor: "bg-rose-50",
    tips: [
      "Dress in layers so you can remove clothing quickly",
      "Keep a fan nearby for immediate cooling relief",
      "Stay hydrated by drinking plenty of water throughout the day",
      "Avoid triggers like spicy foods, caffeine, and alcohol",
      "Practice deep breathing exercises when a flash starts",
      "Take cool baths or showers before bed",
    ],
  },
  {
    id: "nightSweats",
    symptom: "Night Sweats",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    tips: [
      "Use moisture-wicking bedding and pajamas",
      "Keep the bedroom cool, around 65-68°F",
      "Place a fan by your bed for air circulation",
      "Avoid heavy meals 2-3 hours before sleep",
      "Limit liquids before bedtime",
      "Keep extra sheets nearby for quick changes",
    ],
  },
  {
    id: "sleep",
    symptom: "Sleep Issues",
    icon: Moon,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    tips: [
      "Maintain a consistent sleep schedule",
      "Create a cool, dark sleeping environment",
      "Try relaxation techniques like meditation or yoga",
      "Avoid screens 1 hour before bed",
      "Limit caffeine after 2 PM",
      "Exercise regularly, but not close to bedtime",
    ],
  },
  {
    id: "nutrition",
    symptom: "Nutrition & Diet",
    icon: Apple,
    color: "text-green-600",
    bgColor: "bg-green-50",
    tips: [
      "Eat foods rich in phytoestrogens like soy and flaxseed",
      "Include calcium and vitamin D for bone health",
      "Increase fiber intake to support digestion",
      "Eat omega-3 rich foods like fish and nuts",
      "Limit sugar and processed foods",
      "Consider plant-based alternatives when possible",
    ],
  },
  {
    id: "exercise",
    symptom: "Exercise & Movement",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    tips: [
      "Aim for 150 minutes of moderate exercise per week",
      "Try low-impact activities like walking or swimming",
      "Practice yoga for flexibility and stress relief",
      "Strength training helps maintain bone density",
      "Stretching reduces muscle tension",
      "Regular exercise improves sleep quality",
    ],
  },
  {
    id: "stress",
    symptom: "Stress & Mood",
    icon: Leaf,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    tips: [
      "Practice mindfulness and meditation daily",
      "Try deep breathing exercises when stressed",
      "Connect with friends and family regularly",
      "Consider journaling your thoughts and feelings",
      "Take breaks throughout the day to rest",
      "Limit caffeine which can increase anxiety",
    ],
  },
];

export function Recommendations() {
  return (
    <div className="min-h-full pb-6 max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
        <h1 className="font-display text-4xl font-medium text-gray-800 mb-2 tracking-tight">Recommendations</h1>
        <p className="text-gray-600 text-sm">Helpful tips to manage your menopause symptoms</p>
      </div>

      {/* Intro Banner */}
      <div className="px-5 mb-6 mt-4">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-200">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#b76767] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-800 mb-1">Self-Care Matters</p>
              <p className="text-sm text-gray-600">
                These evidence-based recommendations can help you manage symptoms and improve your quality of life during menopause.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="px-5 space-y-4">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${rec.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${rec.color}`} />
                </div>
                <h3 className="font-semibold text-gray-800">{rec.symptom}</h3>
              </div>

              {/* Tips List */}
              <div className="space-y-2">
                {rec.tips.map((tip, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-[#9e5757]">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="px-5 mt-6 mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 text-white">
          <div className="flex items-start gap-3">
            <TrendingDown className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Track Your Progress</p>
              <p className="text-sm opacity-90">
                Log your symptoms daily and use these recommendations to find what works best for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
