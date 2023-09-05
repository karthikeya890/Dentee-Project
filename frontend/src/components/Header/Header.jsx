import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header-container">
      <img alt="dentee-logo" src={logo} className="Header-logo" />
    </div>
  );
};

export default Header;
