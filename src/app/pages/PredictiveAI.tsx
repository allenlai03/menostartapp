import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Shield,
  ChevronRight,
  Activity,
  Footprints,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const forecastData = [
  { time: "6 AM", risk: 12 },
  { time: "8 AM", risk: 18 },
  { time: "10AM", risk: 35 },
  { time: "12PM", risk: 72 },
  { time: "2 PM", risk: 85 },
  { time: "4 PM", risk: 60 },
  { time: "6 PM", risk: 40 },
  { time: "8 PM", risk: 25 },
  { time: "10PM", risk: 15 },
];

const upcoming = [
  {
    time: "12:30 PM",
    message: "Hot flash likely. Try the cooling breath technique.",
    severity: "high" as const,
  },
  {
    time: "2:15 PM",
    message: "Moderate chance. Stay near a cool area if you can.",
    severity: "medium" as const,
  },
  {
    time: "5:45 PM",
    message: "Low chance. Keep hydrated throughout the evening.",
    severity: "low" as const,
  },
];

const bodySignals = [
  {
    icon: Heart,
    title: "Heart rhythm is changing",
    detail: "Your heart pattern often shifts like this before a hot flash",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: Thermometer,
    title: "Skin temperature is rising",
    detail: "About 1°F warmer than your usual baseline right now",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Footprints,
    title: "You've been still for a while",
    detail: "Light movement can help — you've been sitting for 45 minutes",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const actions = [
  {
    icon: Wind,
    title: "Take 5 slow breaths",
    description: "Breathe in 4 sec, hold 7, out 8. Lowers core temperature.",
    time: "2 min",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Droplets,
    title: "Drink cold water",
    description: "A glass of cold water helps your body cool from the inside.",
    time: "Now",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Shield,
    title: "Cool your space",
    description: "Turn on a fan, open a window, or move somewhere cooler.",
    time: "5 min",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function PredictiveAI() {
  const [riskLevel] = useState(72);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (riskLevel / 100) * circumference;

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Your Forecast</h1>
          <p className="text-sm text-gray-500">
            Based on your bracelet data
          </p>
        </div>
      </div>

      {/* Main Alert */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-6 shadow-lg mb-6 text-white">
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <svg width="100" height="100" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r="54"
                stroke="white"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 70 70)"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{riskLevel}%</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold leading-snug">
              Hot flash likely in about 35 minutes
            </p>
            <p className="text-sm text-amber-100 mt-1 leading-relaxed">
              Your bracelet detected early signs. Scroll down for tips.
            </p>
          </div>
        </div>
      </div>

      {/* What You Can Do — most important section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 px-1 mb-3">
          What you can do now
        </h3>
        <div className="space-y-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={i}
                className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{action.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-0.5">
                    {action.description}
                  </p>
                </div>
                <span className="text-sm text-gray-400 font-medium flex-shrink-0">
                  {action.time}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* What Your Body Is Showing */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 px-1 mb-3">
          What your body is showing
        </h3>
        <div className="space-y-3">
          {bodySignals.map((signal, i) => {
            const Icon = signal.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${signal.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}
                >
                  <Icon className={`w-5 h-5 ${signal.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{signal.title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mt-0.5">
                    {signal.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Ahead */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          Your day ahead
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Predicted hot flash risk throughout the day
        </p>

        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="riskAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              interval={1}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value}%`, "Risk"]}
            />
            <ReferenceLine
              y={70}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <Area
              type="monotone"
              dataKey="risk"
              stroke="#f59e0b"
              strokeWidth={2.5}
              fill="url(#riskAreaFill)"
              dot={{ fill: "#fff", strokeWidth: 2, r: 3, stroke: "#f59e0b" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Predictions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 px-1 mb-3">
          Later today
        </h3>
        <div className="space-y-3">
          {upcoming.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
            >
              <div
                className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  item.severity === "high"
                    ? "bg-amber-500"
                    : item.severity === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 font-medium">
                  {item.time}
                </p>
                <p className="text-sm text-gray-700 mt-0.5 leading-relaxed">
                  {item.message}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-purple-800">
              How this works
            </p>
            <p className="text-sm text-purple-600 leading-relaxed mt-1">
              Your MenoStart bracelet continuously reads your heart rhythm, skin
              temperature, and movement. Our AI learns your personal patterns
              over time and can spot the early signs of a hot flash 15–45
              minutes before you feel it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
