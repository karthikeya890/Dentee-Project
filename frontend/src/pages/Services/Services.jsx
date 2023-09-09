import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./Services.css";

const Services = () => {
  return (
    <div className="Services-container">
      <Header />
      <main className="Services-main-container">
        <h1 className="Services-h1">
          Dedicated to Dentist Care - Ensuring Excellence in Every Aspect
        </h1>
        <div className="Services-cards row">
          {manageCardHandler()}
          {educateCardHandler()}
          {buyCardHandler()}
          {discoverCardHandler()}
        </div>
      </main>
    </div>
  );
};

const manageCardHandler = () => {
  return (
    <section className="col-lg-3 col-12 col-sm-6  mt-5  mt-lg-0 mb-5 mb-lg-0 d-flex flex-column justify-content-center align-items-center ">
      <div className="Services-manage-card">
        <div className="Services-manage-icon-container">
          <i className="fa-solid fa-user Services-manage-icon"></i>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Manage</p>
          <p>Practice management Software</p>
          <Link to="/clinics">
            <button className="Click-here-manage-btn">
              Click Here &gt;&gt;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const educateCardHandler = () => {
  return (
    <section className="col-lg-3 col-12 col-sm-6 mb-5 mt-sm-5 mt-lg-0 mb-lg-0 d-flex flex-column justify-content-center align-items-center ">
      <div className="Services-educate-card">
        <div className="Services-educate-icon-container">
          <i className="fa-solid fa-clipboard Services-educate-icon"></i>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Educate</p>
          <p>Discover Courses, Conferences</p>
          <Link to="/educate">
            <button className="Click-here-educate-btn">
              Click Here &gt;&gt;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const buyCardHandler = () => {
  return (
    <section className="col-lg-3 col-12 col-sm-6  mb-5  mb-sm-0 d-flex  flex-column justify-content-center align-items-center ">
      <div className="Services-buy-card">
        <div className="Services-buy-icon-container">
          <i className="fa-solid fa-cart-shopping Services-buy-icon"></i>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Buy</p>
          <p>Dental Supplies Online</p>
          <Link to="/buy">
            <button className="Click-here-buy-btn">Click Here &gt;&gt;</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const discoverCardHandler = () => {
  return (
    <section className="col-lg-3 col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center ">
      <div className="Services-discover-card">
        <div className="Services-discover-icon-container">
          <i className="fa-solid fa-user-pen Services-discover-icon"></i>
        </div>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "180px" }}
        >
          <p style={{ fontSize: "25px" }}>Discover</p>
          <p>Manage Your Profile</p>
          <Link to="/discover">
            <button className="Click-here-discover-btn">
              Click Here &gt;&gt;
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
