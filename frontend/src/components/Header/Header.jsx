import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/api";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDoctorQuery, useUpdateDoctorMutation } from "../../api/doctor";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Dropdown, Space } from "antd";
import Navs from "../Navs/Navs";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  const paths = [
    "/services",
    "/clinics",
    "/addClinic",
    "/manage/dashboard",
    "/manage/accounts",
    "/manage/administrator",
    "/manage/appointments",
    "/manage/patients",
    "/manage/reports",
  ];

  if (paths.includes(path)) {
    const { data, isSuccess } = useDoctorQuery();
    const [updateDoctor] = useUpdateDoctorMutation();
    const [dropDown, setDropDown] = useState(false);
    const nagivate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mainPaths = [
      "/manage/dashboard",
      "/manage/accounts",
      "/manage/administrator",
      "/manage/appointments",
      "/manage/patients",
      "/manage/reports",
    ];

    if (isSuccess)
      return (
        <div className="Header-container">
          {mainPaths.includes(path) ? (
            <div>
              <button onClick={handleShow} className="Hamburger-btn d-lg-none">
                <i className="fa-solid fa-bars"></i>
              </button>
              <Offcanvas
                style={{ width: "250px" }}
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <Link to="/services">{logoHandler()}</Link>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Navs />
                </Offcanvas.Body>
              </Offcanvas>
              <Link className="d-none d-lg-inline" to="/services">
                {logoHandler()}
              </Link>
            </div>
          ) : (
            <Link to="/services">{logoHandler()}</Link>
          )}

          <div className="d-flex align-items-center">
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
        style={{ width: "100px", height: "40px" }}
        className="check-in-out btn btn-danger"
        onClick={() => {
          updateDoctor({ status: "INACTIVE" });
        }}
      >
        checkOut
      </button>
    );
  };

  const checkInHandler = () => {
    return (
      <button
        style={{ width: "100px", height: "40px" }}
        className="check-in-out btn btn-success"
        onClick={() => {
          updateDoctor({ status: "ACTIVE" });
        }}
      >
        checkIn
      </button>
    );
  };

  if (data.status === "ACTIVE") return checkOutHandler();

  if (data.status === "INACTIVE") return checkInHandler();
};

const profileHandler = (dropDown, setDropDown, dispatch, nagivate) => {
  const onLogoutHandler = () => {
    dispatch(api.util.resetApiState());
    Cookies.remove("jwtToken");
    nagivate("/login");
    console.log("hey");
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="drop-down-li">
          <i className="fa-solid fa-pen-to-square me-2"></i> My Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="drop-down-li">
          <i className="fa-solid fa-user me-2"></i> Account Settings
        </div>
      ),
    },

    {
      key: "3",
      danger: true,
      label: (
        <p onClick={onLogoutHandler} className="m-0 fw-bold text-center">
          Logout
        </p>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className="Header-profile-btn ms-4">
          <i className="fa-solid fa-user Header-profile-icon"></i>
        </Space>
      </a>
    </Dropdown>
  );
};

export default Header;
