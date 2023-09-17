import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Navs from "../../components/Navs/Navs";
import "./Manage.css";

const Manage = () => {
  return (
    <div className="Manage-container">
      <Header />
      <main className="Manage-main-container">
        <div className="Manage-ul-navs">{Navs()}</div>
        <Outlet />
      </main>
    </div>
  );
};

export default Manage;
