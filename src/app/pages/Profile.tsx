import { Settings, Bell, HelpCircle, Shield, Award, Calendar, TrendingUp, LogOut } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";

export function Profile() {
  const stats = [
    { label: "Days Tracked", value: "87", icon: Calendar, color: "from-rose-400 to-pink-500" },
    { label: "Streak", value: "12", icon: Award, color: "from-orange-400 to-red-500" },
    { label: "Avg Sleep", value: "6.5h", icon: TrendingUp, color: "from-purple-400 to-indigo-500" },
  ];

  const menuItems = [
    { icon: Settings, label: "Account Settings", color: "text-gray-600", bgColor: "bg-gray-100" },
    { icon: Bell, label: "Notifications", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: Shield, label: "Privacy & Security", color: "text-green-600", bgColor: "bg-green-100" },
    { icon: HelpCircle, label: "Help & Support", color: "text-purple-600", bgColor: "bg-purple-100" },
  ];

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <ImageWithFallback
              src="https://i.pravatar.cc/150?img=10"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-rose-100"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Jessica Anderson</h2>
            <p className="text-gray-500">jessica.anderson@email.com</p>
          </div>
        </div>

        <Button className="w-full bg-rose-100 text-rose-600 hover:bg-rose-200 h-11 rounded-xl font-medium">
          Edit Profile
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md text-center"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-semibold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Journey Progress */}
      <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Your Journey</p>
            <h3 className="text-2xl font-semibold">87 Days Strong</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
        <p className="text-sm opacity-90 mb-4">
          You've been consistently tracking your symptoms and making progress.
        </p>
        <div className="bg-white/20 backdrop-blur-sm rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-3/4" />
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="font-medium text-gray-800 flex-1 text-left">{item.label}</p>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {/* App Info */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6">
        <p className="text-center text-sm text-gray-600 mb-2">MenoStart</p>
        <p className="text-center text-xs text-gray-500">Version 1.0.0</p>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white/60 backdrop-blur-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>
    </div>
  );
}
