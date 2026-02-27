import { Outlet, useLocation, Link } from "react-router";
import { Home, PlusCircle, Users, Heart, User } from "lucide-react";

export function Layout() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/log", icon: PlusCircle, label: "Log" },
    { path: "/community", icon: Users, label: "Community" },
    { path: "/partner", icon: Heart, label: "Partner" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-rose-100 safe-area-inset-bottom">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all"
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? "text-rose-500" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isActive ? "text-rose-500" : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
