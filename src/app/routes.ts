import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Voting from "./pages/Voting";
import Scanner from "./pages/Scanner";
import HostRoom from "./pages/HostRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/host",
    Component: HostRoom,
  },
  {
    path: "/scanner",
    Component: Scanner,
  },
  {
    path: "/vote",
    Component: Voting,
  },
]);
