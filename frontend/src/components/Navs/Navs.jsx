import { NavLink } from "react-router-dom";

import "./Navs.css";

const Navs = () => {
  return (
    <ul className="Manage-sidebar-ul">
      <li>
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-house Manage-nav-icon"></i>
          <p className="Manage-nav-name">Dashboard</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="appointments"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-calendar-days Manage-nav-icon"></i>
          Appointments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="patients"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-people-group Manage-nav-icon"></i>
          Patients
        </NavLink>
      </li>
      <li>
        <NavLink
          to="accounts"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-money-bill Manage-nav-icon"></i>
          Accounts
        </NavLink>
      </li>
      <li>
        <NavLink
          to="reports"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-chart-line Manage-nav-icon"></i>
          Reports
        </NavLink>
      </li>
      <li>
        <NavLink
          to="administrator"
          className={({ isActive }) =>
            isActive ? "Manage-nav-active" : "Manage-nav-inactive"
          }
        >
          <i className="fa-solid fa-file-pen Manage-nav-icon"></i>
          Administrator
        </NavLink>
      </li>
    </ul>
  );
};

export default Navs;
