import "./NotFound.css";

import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img
          width={500}
          src="https://res.cloudinary.com/dcm21aeqp/image/upload/v1694062430/not-found_bon3k7.jpg"
          alt="not-found"
        />
        <h1 className="text-secondary mb-5">Page Not Found</h1>
        <Link to="/">
          <button className="btn btn-primary">Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
