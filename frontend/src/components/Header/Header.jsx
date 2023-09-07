import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDoctorQuery, useUpdateDoctorMutation } from "../../api/doctor";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/services") {
    const { data, isSuccess } = useDoctorQuery();
    const [updateDoctor] = useUpdateDoctorMutation();
    const [dropDown, setDropDown] = useState(false);
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    return (
      <div className="Header-container">
        {logoHandler()}
        <div className="d-flex">
          {isSuccess && checkInOutHandler(data, updateDoctor)}
          {isSuccess &&
            profileHandler(dropDown, setDropDown, dispatch, nagivate)}
        </div>
      </div>
    );
  }

  return <div className="Header-container">{logoHandler()}</div>;
};

const logoHandler = () => {
  return (
    <img
      alt="dentee-logo"
      src="https://res.cloudinary.com/dcm21aeqp/image/upload/v1694088984/logo_d3h7fb.png"
      className="Header-logo"
      loading="lazy"
    />
  );
};

const checkInOutHandler = (data, updateDoctor) => {
  const checkOutHandler = () => {
    return (
      <button
        style={{ width: "120px" }}
        className="check-in-out btn btn-danger"
        onClick={() => {
          updateDoctor({ status: "INACTIVE" });
        }}
      >
        CheckOut
      </button>
    );
  };

  const checkInHandler = () => {
    return (
      <button
        style={{ width: "120px" }}
        className="check-in-out btn btn-success"
        onClick={() => {
          updateDoctor({ status: "ACTIVE" });
        }}
      >
        CheckIn
      </button>
    );
  };

  if (data.status === "ACTIVE") return checkOutHandler();

  if (data.status === "INACTIVE") return checkInHandler();
};

const profileHandler = (dropDown, setDropDown, dispatch, nagivate) => {
  const profileDropDownHandler = () => {
    const onLogoutHandler = () => {
      dispatch(api.util.resetApiState());
      Cookies.remove("jwtToken");
      nagivate("/login");
    };

    return (
      <div
        className={`drop-down-container ${dropDown ? "active" : "inactive"}`}
      >
        <ul className="drop-down-ul">
          <li className="drop-down-li">
            <i className="fa-solid fa-pen-to-square me-2"></i> My Profile
          </li>
          <li className="drop-down-li">
            <i className="fa-solid fa-user me-2"></i> Account Settings
          </li>
          <li className="drop-down-li logout">
            <button onClick={onLogoutHandler} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDropDown(!dropDown);
        }}
        className="ms-4 Header-profile-btn"
      >
        <i className="fa-solid fa-user Header-profile-icon"></i>
      </button>
      {profileDropDownHandler()}
    </>
  );
};

export default Header;
