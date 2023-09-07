import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (Cookies.get("jwtToken")) return children;
  return <Navigate to="/login" replace="true" />;
};

export default ProtectedRoute;
