import { lazy } from "react";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));

const routes = [
  {
    path: "/register",
    name: "Register page",
    component: Register,
    protected: true,
  },
  {
    path: "/login",
    name: "Login page",
    component: Login,
    protected: true,
  },
];

export default routes;
