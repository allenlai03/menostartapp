import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Download,
  Share2,
  FileText,
  Flame,
  Moon,
  Thermometer,
  Activity,
  TrendingDown,
  TrendingUp,
  Calendar,
  Printer,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const weeklyData = [
  { week: "Week 1", hotFlashes: 14, nightSweats: 5 },
  { week: "Week 2", hotFlashes: 18, nightSweats: 7 },
  { week: "Week 3", hotFlashes: 11, nightSweats: 4 },
  { week: "Week 4", hotFlashes: 9, nightSweats: 3 },
];

const dailyTemps = [
  { day: "1", temp: 98.1 },
  { day: "5", temp: 98.4 },
  { day: "10", temp: 98.8 },
  { day: "15", temp: 98.3 },
  { day: "20", temp: 98.6 },
  { day: "25", temp: 98.2 },
  { day: "30", temp: 98.0 },
];

const summaryStats = [
  {
    icon: Flame,
    label: "Hot Flashes",
    value: "52",
    unit: "total",
    change: "-27%",
    trend: "down" as const,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: Moon,
    label: "Avg Sleep",
    value: "6.5",
    unit: "hrs/night",
    change: "+15%",
    trend: "up" as const,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Thermometer,
    label: "Avg Temp",
    value: "98.3",
    unit: "°F",
    change: "-0.3°F",
    trend: "down" as const,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Activity,
    label: "Avg HRV",
    value: "54",
    unit: "ms",
    change: "+8%",
    trend: "up" as const,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

const triggers = [
  { trigger: "Poor sleep (under 6 hours)", correlation: 73, count: 18 },
  { trigger: "High stress periods", correlation: 61, count: 14 },
  { trigger: "Caffeine after 2 PM", correlation: 45, count: 9 },
  { trigger: "Hot environments", correlation: 38, count: 7 },
];

export function ClinicianReport() {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Doctor Report</h1>
          <p className="text-sm text-gray-500">Share with your clinician</p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Patient Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 shadow-lg mb-6 text-white">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-emerald-100 text-xs font-semibold tracking-wide">
              PATIENT REPORT
            </p>
            <h2 className="text-xl font-bold mt-1">Sarah Johnson</h2>
            <p className="text-emerald-100 text-sm mt-0.5">
              Age 48 — Perimenopause
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <p className="text-sm font-semibold">30 Days</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Calendar className="w-4 h-4 text-emerald-200" />
          <p className="text-sm text-emerald-100">
            Mar 28, 2026 — Apr 27, 2026
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {summaryStats.map((stat, i) => {
          const Icon = stat.icon;
          const isGood =
            stat.label === "Hot Flashes" || stat.label === "Avg Temp"
              ? stat.trend === "down"
              : stat.trend === "up";
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;

          return (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-0.5 ${isGood ? "text-green-500" : "text-red-500"}`}
                >
                  <TrendIcon className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {stat.label} — {stat.unit}
              </p>
            </div>
          );
        })}
      </div>

      {/* Weekly Symptom Chart */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-1">
          Weekly Symptom Trend
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Hot flashes and night sweats per week
        </p>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} barGap={4}>
            <defs>
              <linearGradient id="reportHfBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <linearGradient id="reportNsBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="hotFlashes"
              name="Hot Flashes"
              fill="url(#reportHfBar)"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="nightSweats"
              name="Night Sweats"
              fill="url(#reportNsBar)"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-center gap-5 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-rose-400" />
            <span className="text-sm text-gray-500">Hot Flashes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-violet-500" />
            <span className="text-sm text-gray-500">Night Sweats</span>
          </div>
        </div>
      </div>

      {/* Temperature Trend */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-1">Temperature Trend</h3>
        <p className="text-sm text-gray-500 mb-4">
          Average daily skin temperature (°F)
        </p>

        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={dailyTemps}>
            <defs>
              <linearGradient
                id="reportTempLine"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              domain={[97.5, 99.5]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value}°F`, "Temperature"]}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#reportTempLine)"
              strokeWidth={2.5}
              dot={{ fill: "#fff", strokeWidth: 2, r: 3, stroke: "#fb923c" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trigger Analysis */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-1">Trigger Analysis</h3>
        <p className="text-sm text-gray-500 mb-4">
          AI-identified correlations from wearable data
        </p>

        <div className="space-y-4">
          {triggers.map((t, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm text-gray-700 font-medium">
                  {t.trigger}
                </p>
                <span className="text-sm text-gray-500 font-medium">
                  {t.correlation}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                  style={{ width: `${t.correlation}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {t.count} occurrences this period
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Clinical Summary */}
      <div className="bg-white rounded-3xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Clinical Summary</h3>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            Patient shows a{" "}
            <strong className="text-gray-800">
              downward trend in hot flash frequency
            </strong>{" "}
            over the reporting period (14 to 9 per week, -27%), suggesting
            current management strategies are effective.
          </p>
          <p>
            <strong className="text-gray-800">Sleep quality improved</strong>{" "}
            from 6.2 to 7.1 hours average, correlating with reduced symptom
            severity. HRV increased 8%, indicating improved autonomic
            regulation.
          </p>
          <p>
            <strong className="text-gray-800">
              Primary triggers identified:
            </strong>{" "}
            sleep deprivation (73% correlation), stress (61%), and afternoon
            caffeine (45%). Continued focus on sleep hygiene and stress
            management recommended.
          </p>
          <p className="text-xs text-gray-400 italic pt-1">
            AI-generated from wearable sensor data and self-reported symptoms.
            Intended to support — not replace — clinical judgment.
          </p>
        </div>
      </div>

      {/* Export Actions */}
      <div className="space-y-3 mb-6">
        <button
          onClick={handleExport}
          className={`w-full py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
            exported
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
          }`}
        >
          {exported ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              PDF Generated Successfully!
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Export as PDF
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-3.5 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 bg-white shadow-sm text-gray-700 active:scale-[0.98] transition-transform">
            <Share2 className="w-4 h-4" />
            Email to Doctor
          </button>
          <button className="py-3.5 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 bg-white shadow-sm text-gray-700 active:scale-[0.98] transition-transform">
            <Printer className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* HIPAA Notice */}
      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
        <p className="text-sm text-blue-700 leading-relaxed">
          <strong>Privacy Notice:</strong> This report contains protected health
          information. All data is encrypted and HIPAA-compliant. MenoStart does
          not share your data with third parties.
        </p>
      </div>
    </div>
  );
}
