import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Voting from "./pages/Voting";
import Scanner from "./pages/Scanner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
