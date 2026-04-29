import { Outlet, useLocation, Link } from "react-router";
import { Home, Activity, MessageCircle, User, Plus } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const leftNav = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/predict", icon: Activity, label: "Predict" },
  ];

  const rightNav = [
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const isLogActive = location.pathname === "/log";

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 safe-area-inset-bottom">
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-around items-end py-2">
            {leftNav.map((item) => (
              <NavItem key={item.path} item={item} pathname={location.pathname} />
            ))}

            <Link to="/log" className="flex flex-col items-center relative -top-4">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200/50 active:scale-95 transition-transform ${isLogActive ? "ring-3 ring-rose-200" : ""}`}
              >
                <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span
                className={`text-[11px] font-semibold mt-1 ${isLogActive ? "text-rose-500" : "text-gray-500"}`}
              >
                Log
              </span>
            </Link>

            {rightNav.map((item) => (
              <NavItem key={item.path} item={item} pathname={location.pathname} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavItem({
  item,
  pathname,
}: {
  item: { path: string; icon: typeof Home; label: string };
  pathname: string;
}) {
  const Icon = item.icon;
  const isActive =
    item.path === "/"
      ? pathname === "/"
      : pathname.startsWith(item.path);

  return (
    <Link
      to={item.path}
      className="flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]"
    >
      <Icon
        className={`w-6 h-6 transition-colors ${isActive ? "text-rose-500" : "text-gray-400"}`}
      />
      <span
        className={`text-[11px] font-semibold transition-colors ${isActive ? "text-rose-500" : "text-gray-500"}`}
      >
        {item.label}
      </span>
    </Link>
  );
}
