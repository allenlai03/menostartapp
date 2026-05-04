import { useState } from "react";
import { Link } from "react-router";
import {
  Flame,
  Thermometer,
  Moon,
  TrendingUp,
  Battery,
  Activity,
  FileText,
  ChevronRight,
  Heart,
  MessageCircle,
  Users,
} from "lucide-react";
import { Logo } from "../components/Logo";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const weeklyData = [
  { day: "Mon", hotFlashes: 3, temp: 98.2, sleep: 6 },
  { day: "Tue", hotFlashes: 5, temp: 98.8, sleep: 5 },
  { day: "Wed", hotFlashes: 2, temp: 98.1, sleep: 7 },
  { day: "Thu", hotFlashes: 4, temp: 98.6, sleep: 5.5 },
  { day: "Fri", hotFlashes: 3, temp: 98.3, sleep: 6.5 },
  { day: "Sat", hotFlashes: 1, temp: 98.0, sleep: 8 },
  { day: "Sun", hotFlashes: 2, temp: 98.2, sleep: 7 },
];

export function Home() {
  const [selectedMetric, setSelectedMetric] = useState<
    "hotFlashes" | "temp" | "sleep"
  >("hotFlashes");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const metrics = [
    {
      id: "hotFlashes" as const,
      icon: Flame,
      label: "Hot Flashes",
      value: "3",
      unit: "today",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      gradient: "from-red-400 to-red-600",
    },
    {
      id: "temp" as const,
      icon: Thermometer,
      label: "Temperature",
      value: "98.2",
      unit: "°F avg",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      gradient: "from-orange-400 to-red-500",
    },
    {
      id: "sleep" as const,
      icon: Moon,
      label: "Sleep",
      value: "7",
      unit: "hours",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      gradient: "from-purple-400 to-indigo-500",
    },
  ];

  const selectedMetricData = metrics.find((m) => m.id === selectedMetric)!;

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto">
      {/* Brand bar */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <Logo variant="mark" className="w-11 h-11" />
          <span
            className="text-2xl text-[#b76767] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}
          >
            MenoStart
          </span>
        </div>
        <div className="bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2">
          <Battery className="w-5 h-5 text-green-500" fill="currentColor" />
          <div>
            <p className="text-[11px] text-gray-400 font-medium leading-none">
              Ring
            </p>
            <p className="text-base font-bold text-gray-800 leading-tight">
              85%
            </p>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-gray-800 tracking-tight">
          {greeting}, Sarah
        </h1>
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Prediction Alert — the hero */}
      <Link to="/predict" className="block mb-6">
        <div className="bg-gradient-to-br from-[#ec4899] via-[#b76767] to-[#be185d] rounded-3xl p-5 shadow-lg text-white">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-semibold text-rose-50">
                AI Prediction
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-50" />
          </div>
          <h2 className="font-display text-2xl font-medium mb-1 tracking-tight">
            Hot flash likely in ~35 min
          </h2>
          <p className="text-sm text-rose-50 leading-relaxed">
            Your ring detected early signs. Tap for tips to prepare.
          </p>
          <div className="flex items-center gap-2 mt-3 bg-white/15 rounded-xl px-3 py-2 w-fit">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium">72% confidence</span>
          </div>
        </div>
      </Link>

      {/* Today's Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-2xl transition-all ${
                isSelected ? "bg-white shadow-md scale-[1.03]" : "bg-white/60"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${metric.bgColor} flex items-center justify-center mb-2`}
              >
                <Icon className={`w-5 h-5 ${metric.textColor}`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{metric.label}</p>
            </button>
          );
        })}
      </div>

      {/* Weekly Trend */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Weekly Trend
            </h3>
            <p className="text-sm text-gray-500">
              {selectedMetricData.label}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMetricData.gradient} flex items-center justify-center`}
          >
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={weeklyData}>
            <defs>
              <linearGradient
                id="hotFlashesGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient
                id="tempGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient
                id="sleepGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              fontSize={13}
              tickLine={false}
            />
            <YAxis stroke="#9CA3AF" fontSize={13} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke={`url(#${selectedMetric}Gradient)`}
              strokeWidth={3}
              dot={{ fill: "#fff", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Community Preview */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-1 mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Community</h3>
          <Link to="/community" className="text-sm text-[#b76767] font-medium">
            See all
          </Link>
        </div>
        <div className="space-y-2">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-[#9e5757]">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Cooling sheets have been a game changer for my night sweats!
                  Anyone else tried them?
                </p>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <span className="flex items-center gap-1 text-sm">
                    <Heart className="w-3.5 h-3.5" /> 24
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MessageCircle className="w-3.5 h-3.5" /> 8
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-purple-600">K</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Having a rough day but feeling supported by this community.
                  Thank you all!
                </p>
                <div className="flex items-center gap-4 mt-2 text-gray-400">
                  <span className="flex items-center gap-1 text-sm">
                    <Heart className="w-3.5 h-3.5" /> 42
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MessageCircle className="w-3.5 h-3.5" /> 15
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 px-1">
          <Users className="w-4 h-4 text-[#c98484]" />
          <p className="text-sm text-gray-500">
            <strong className="text-gray-700">12,847</strong> women supporting
            each other
          </p>
        </div>
      </div>

      {/* Partner Connect Widget */}
      <Link to="/partner" className="block mb-6">
        <div className="bg-gradient-to-br from-[#b76767] to-[#c98484] rounded-2xl p-4 shadow-sm text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Partner Connected</p>
              <p className="text-sm text-rose-50">
                Alex receives your daily updates
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-rose-100" />
          </div>
        </div>
      </Link>

      {/* Doctor Report Link */}
      <Link to="/report" className="block">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Doctor Report</p>
            <p className="text-sm text-gray-500">
              Export your 30-day health summary
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </Link>
    </div>
  );
}
