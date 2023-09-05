import { lazy } from "react";

const Register = lazy(() => import("./pages/Register/Register"));

const routes = [
  {
    path: "/register",
    component: Register,
    protected: true,
  },
];

export default routes;
