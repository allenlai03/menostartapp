import { Link } from "react-router";
import {
  Settings,
  Bell,
  HelpCircle,
  Shield,
  Award,
  Calendar,
  TrendingUp,
  LogOut,
  Users,
  Heart,
  FileText,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Logo } from "../components/Logo";

export function Profile() {
  const stats = [
    {
      label: "Days Tracked",
      value: "87",
      icon: Calendar,
      gradient: "from-rose-400 to-pink-500",
    },
    {
      label: "Streak",
      value: "12",
      icon: Award,
      gradient: "from-orange-400 to-red-500",
    },
    {
      label: "Avg Sleep",
      value: "6.5h",
      icon: TrendingUp,
      gradient: "from-purple-400 to-indigo-500",
    },
  ];

  const featureLinks = [
    {
      icon: Users,
      label: "Community",
      description: "Connect with others",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      path: "/community",
    },
    {
      icon: Heart,
      label: "Partner Connect",
      description: "Share with your support person",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      path: "/partner",
    },
    {
      icon: FileText,
      label: "Doctor Reports",
      description: "Export health summaries",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      path: "/report",
    },
    {
      icon: BookOpen,
      label: "Recommendations",
      description: "Tips for managing symptoms",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/recommendations",
    },
  ];

  const settingsLinks = [
    {
      icon: Settings,
      label: "Account Settings",
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      icon: Bell,
      label: "Notifications",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <ImageWithFallback
              src="https://i.pravatar.cc/150?img=10"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-rose-100"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Sarah Johnson</h2>
            <p className="text-sm text-gray-500">sarah.johnson@email.com</p>
          </div>
        </div>

        <Button className="w-full bg-rose-50 text-rose-600 hover:bg-rose-100 h-12 rounded-xl font-semibold shadow-none">
          Edit Profile
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm text-center"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-2`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Journey Progress */}
      <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg mb-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm text-rose-100">Your Journey</p>
            <h3 className="text-2xl font-bold">87 Days Strong</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
        <p className="text-sm text-rose-100 mb-4 leading-relaxed">
          Consistently tracking symptoms and making real progress.
        </p>
        <div className="bg-white/20 rounded-full h-2.5">
          <div className="bg-white rounded-full h-2.5 w-3/4" />
        </div>
      </div>

      {/* Feature Links */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 px-1 mb-3">
          Features
        </h3>
        <div className="space-y-2">
          {featureLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                to={item.path}
                className="block bg-white rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 px-1 mb-3">
          Settings
        </h3>
        <div className="space-y-2">
          {settingsLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <p className="font-semibold text-gray-800 flex-1 text-left">
                  {item.label}
                </p>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </button>
            );
          })}
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white/60 rounded-2xl p-4 mb-4 flex flex-col items-center gap-1">
        <Logo variant="mark" className="w-8 h-8 mb-1" />
        <p
          className="text-center text-base text-[#b76767]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}
        >
          MenoStart
        </p>
        <p className="text-center text-sm text-gray-400">Version 1.0.0</p>
      </div>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white/60 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Log Out
      </Button>
    </div>
  );
}
