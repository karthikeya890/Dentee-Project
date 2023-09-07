import { lazy } from "react";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Services = lazy(() => import("./pages/Services/Services"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Home = lazy(() => import("./pages/Home/Home"));
const routes = [
  {
    path: "/register",
    name: "Register page",
    component: Register,
  },
  {
    path: "/login",
    name: "Login page",
    component: Login,
  },
  {
    path: "/services",
    name: "Services page",
    component: Services,
    protected: true,
  },
  {
    path: "/",
    name: "Home page",
    component: Home,
    protected: true,
  },
  {
    path: "*",
    name: "Not Found page",
    component: NotFound,
  },
];

export default routes;
