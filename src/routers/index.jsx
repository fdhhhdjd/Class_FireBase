//* IMPORT
import AboutPage from "@/pages/about/page";
import AuthPage from "@/pages/auth";
import HomePage from "@/pages/home/page";

export default [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
];
