import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Log } from "./pages/Log";
import { Community } from "./pages/Community";
import { Partner } from "./pages/Partner";
import { Profile } from "./pages/Profile";
import { Recommendations } from "./pages/Recommendations";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "log", Component: Log },
      { path: "community", Component: Community },
      { path: "partner", Component: Partner },
      { path: "profile", Component: Profile },
      { path: "recommendations", Component: Recommendations },
    ],
  },
]);
