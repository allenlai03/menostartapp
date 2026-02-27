import { useState } from "react";
import { Flame, Thermometer, Moon, TrendingUp, Calendar, Battery, Cloud, Droplets, Apple, Zap, Leaf, Wind } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const mockData = [
  { day: "Mon", hotFlashes: 3, temp: 98.2, sleep: 6 },
  { day: "Tue", hotFlashes: 5, temp: 98.8, sleep: 5 },
  { day: "Wed", hotFlashes: 2, temp: 98.1, sleep: 7 },
  { day: "Thu", hotFlashes: 4, temp: 98.6, sleep: 5.5 },
  { day: "Fri", hotFlashes: 3, temp: 98.3, sleep: 6.5 },
  { day: "Sat", hotFlashes: 1, temp: 98.0, sleep: 8 },
  { day: "Sun", hotFlashes: 2, temp: 98.2, sleep: 7 },
];

export function Home() {
  const [selectedMetric, setSelectedMetric] = useState<"hotFlashes" | "temp" | "sleep">("hotFlashes");

  const today = new Date().toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "long", 
    day: "numeric" 
  });

  const metrics = [
    {
      id: "hotFlashes" as const,
      icon: Flame,
      label: "Hot Flashes",
      value: "3",
      unit: "today",
      color: "from-rose-400 to-pink-500",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600",
    },
    {
      id: "temp" as const,
      icon: Thermometer,
      label: "Temperature",
      value: "98.2",
      unit: "°F",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      id: "sleep" as const,
      icon: Moon,
      label: "Sleep",
      value: "7",
      unit: "hours",
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const selectedMetricData = metrics.find((m) => m.id === selectedMetric)!;

  const quickTips = [
    {
      icon: Cloud,
      label: "Hot Flashes",
      tip: "Dress in layers and keep a fan nearby",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      icon: Droplets,
      label: "Night Sweats",
      tip: "Use moisture-wicking bedding and cool your room",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Apple,
      label: "Nutrition",
      tip: "Eat foods rich in phytoestrogens",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto">
      {/* Header with Battery */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-1">Welcome back</h1>
            <p className="text-gray-500">{today}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-md">
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Menostart</p>
                <p className="text-lg font-semibold text-gray-800">85%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758274526406-4c3a319da0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMHdvbWFuJTIwcmVsYXhpbmclMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NzIxNDcyNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wellness"
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm opacity-90 mb-1">Daily Insight</p>
          <p className="font-medium">You're doing great! Keep tracking your symptoms.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;
          
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-2xl transition-all ${
                isSelected
                  ? "bg-white shadow-md scale-105"
                  : "bg-white/60 backdrop-blur-sm"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center mb-2`}>
                <Icon className={`w-5 h-5 ${metric.textColor}`} />
              </div>
              <p className="text-2xl font-semibold text-gray-800">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Weekly Trend</h3>
            <p className="text-sm text-gray-500">{selectedMetricData.label}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMetricData.color} flex items-center justify-center`}>
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockData}>
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
            />
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
            <defs>
              <linearGradient id="hotFlashesGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            

      {/* Quick Tips */}
      <div className="mt-6 space-y-3">
        <h3 className="font-semibold text-gray-700 px-1">Quick Tips</h3>
        <div className="space-y-2">
          {quickTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md flex items-start gap-3"
              >
                <div className={`w-10 h-10 rounded-lg ${tip.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${tip.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm">{tip.label}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-medium text-sm hover:shadow-lg transition-shadow">
          View All Recommendations
        </button>
      </div>  <linearGradient id="sleepGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 px-1">Quick Actions</h3>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800">Track Cycle</p>
            <p className="text-sm text-gray-500">Day 12 of current cycle</p>
          </div>
          <button className="px-4 py-2 bg-rose-100 text-rose-600 rounded-xl text-sm font-medium">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
