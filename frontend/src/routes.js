import { lazy } from "react";

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Services = lazy(() => import("./pages/Services/Services"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Home = lazy(() => import("./pages/Home/Home"));
const Clinics = lazy(() => import("./pages/Clinics/Clinics"));
const AddClinic = lazy(() => import("./pages/AddClinic/AddClinic"));
const Manage = lazy(() => import("./pages/Manage/Manage"));

const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Appointments = lazy(() =>
  import("./components/Appointments/Appointments")
);
const Patients = lazy(() => import("./components/Patients/Patients"));
const Accounts = lazy(() => import("./components/Accounts/Accounts"));
const Reports = lazy(() => import("./components/Reports/Reports"));
const Administrator = lazy(() =>
  import("./components/Administrator/Administrator")
);

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
  {
    path: "/clinics",
    name: "clinics page",
    component: Clinics,
    protected: true,
  },
  {
    path: "/addClinic",
    name: "Add clinic page",
    component: AddClinic,
    protected: true,
  },
  {
    path: "/manage/",
    name: "manage page",
    component: Manage,
    protected: true,
    childern: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "appointments",
        name: "appointments",
        component: Appointments,
      },
      {
        path: "patients",
        name: "patients",
        component: Patients,
      },
      {
        path: "accounts",
        name: "accounts",
        component: Accounts,
      },
      {
        path: "reports",
        name: "reports",
        component: Reports,
      },
      {
        path: "administrator",
        name: "administrator",
        component: Administrator,
      },
    ],
  },
];

export default routes;
