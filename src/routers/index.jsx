//* IMPORT
import AboutPage from "@/pages/about/page";
import HomePage from "@/pages/home/page";
import LoginPage from "@/pages/login/page";

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
    element: <LoginPage />,
  },
];
