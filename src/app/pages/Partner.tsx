import { useState } from "react";
import { Heart, Share2, Bell, MessageSquare, Info, Activity } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";

export function Partner() {
  const [isConnected, setIsConnected] = useState(true);
  const [notifications, setNotifications] = useState({
    dailySummary: true,
    severeSymptoms: true,
    weeklyReport: false,
  });
  const [message, setMessage] = useState("");

  const recentUpdates = [
    {
      date: "Today",
      severity: "moderate",
      summary: "3 hot flashes, moderate sleep quality",
      mood: "Managing well",
    },
    {
      date: "Yesterday",
      severity: "high",
      summary: "5 hot flashes, poor sleep (5 hours)",
      mood: "Challenging day",
    },
    {
      date: "2 days ago",
      severity: "low",
      summary: "1 hot flash, good sleep (8 hours)",
      mood: "Feeling great",
    },
  ];

  return (
    <div className="min-h-full px-5 py-6 max-w-md mx-auto pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl font-medium text-gray-800 mb-1 tracking-tight">Partner Connect</h1>
        <p className="text-gray-500">Keep your support system informed</p>
      </div>

      {/* Hero Image */}
      <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763713512968-fef8805cc6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjBzdXBwb3J0fGVufDF8fHx8MTc3MjE0NzI3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Partner support"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 fill-current" />
            <p className="font-semibold">Connected with Alex</p>
          </div>
          <p className="text-sm opacity-90">
            Sharing helps your partner understand and support you better
          </p>
        </div>
      </div>

      {/* Connection Status */}
      {isConnected ? (
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Partner Connected</p>
              <p className="text-sm opacity-90">Alex receives your updates</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 mb-6 shadow-md">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-8 h-8 text-[#b76767]" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Invite Your Partner</h3>
            <p className="text-sm text-gray-600">
              Share a link to help your partner understand your journey
            </p>
          </div>
          <Button className="w-full bg-gradient-to-r from-[#c98484] to-[#b76767] hover:from-[#a55757] hover:to-[#9e5757] h-12 rounded-xl">
            Send Invitation
          </Button>
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#b76767]" />
          <h3 className="font-semibold text-gray-800">Notification Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Daily Summary</p>
              <p className="text-sm text-gray-500">Send daily symptom updates</p>
            </div>
            <Switch
              checked={notifications.dailySummary}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, dailySummary: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Severe Symptoms Alert</p>
              <p className="text-sm text-gray-500">Notify during difficult days</p>
            </div>
            <Switch
              checked={notifications.severeSymptoms}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, severeSymptoms: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Weekly Report</p>
              <p className="text-sm text-gray-500">Comprehensive weekly overview</p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, weeklyReport: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Recent Updates Shared */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-[#b76767]" />
          <h3 className="font-semibold text-gray-800">Recent Updates</h3>
        </div>

        <div className="space-y-3">
          {recentUpdates.map((update, index) => (
            <div
              key={index}
              className="p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">{update.date}</p>
                <div
                  className={`w-2 h-2 rounded-full ${
                    update.severity === "high"
                      ? "bg-red-500"
                      : update.severity === "moderate"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-700 mb-1">{update.summary}</p>
              <p className="text-xs text-gray-500 italic">{update.mood}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Send Message */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#b76767]" />
          <h3 className="font-semibold text-gray-800">Send a Note</h3>
        </div>

        <Textarea
          placeholder="Let your partner know how you're feeling..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-3 min-h-24 bg-white/60 border-gray-200 rounded-xl"
        />

        <Button className="w-full bg-gradient-to-r from-[#c98484] to-[#b76767] hover:from-[#a55757] hover:to-[#9e5757] h-12 rounded-xl">
          Send Message
        </Button>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-100">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              Privacy & Control
            </p>
            <p className="text-sm text-blue-700">
              You control what information is shared. Your partner only sees what you
              choose to share.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
