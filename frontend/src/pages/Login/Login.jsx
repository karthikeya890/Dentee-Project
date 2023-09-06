import { useState, useEffect } from "react";
import { useLoginMutation } from "../../api/login";
import Header from "../../components/Header/Header";
import doctors from "../../images/doctors.jpg";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const nagivate = useNavigate();

  // Api

  const [loginApi, { isSuccess, data, isError, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("jwtToken", data.jwtToken, { expires: 1 });
      nagivate("/services", { replace: "true" });
    } else if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    loginApi(body);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="Login-container">
      <Header />
      <main className="Login-main-container">
        <img alt="doctors-img" src={doctors} className="Login-doctors-img" />
        <form className="Login-form-container" onSubmit={onSubmitFormHandler}>
          <h3 className="Login-form-header">Login</h3>
          {emailSectionHandler(email, setEmail, emailError, setEmailError)}
          {passwordSectionHandler(
            password,
            setPassword,
            passwordError,
            setPasswordError
          )}
          {registerButtonHandler(password, email)}
          {RegisterDetailsHandler()}
        </form>
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </div>
  );
};

const passwordSectionHandler = (
  password,
  setPassword,
  passwordError,
  setPasswordError
) => {
  //
  const onChangePasswordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
    value === "" ? setPasswordError(true) : setPasswordError(false);
  };

  return (
    <section className="Login-form-section">
      <label htmlFor="name" className="Login-form-label">
        Password *
      </label>
      <input
        id="name"
        className="Login-form-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={onChangePasswordHandler}
      />
      {passwordError && (
        <p className="Login-form-error">Provide a valid Password*</p>
      )}
    </section>
  );
};

const emailSectionHandler = (email, setEmail, emailError, setEmailError) => {
  //
  const onChangeEmailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);
    value !== "" && value.endsWith("@gmail.com")
      ? setEmailError(false)
      : setEmailError(true);
  };

  return (
    <section className="Login-form-section">
      <label htmlFor="name" className="Login-form-label">
        Email *
      </label>
      <input
        id="name"
        className="Login-form-input"
        type="text"
        placeholder="example@gmail.com"
        value={email}
        onChange={onChangeEmailHandler}
      />
      {emailError && <p className="Login-form-error">Provide a valid Email*</p>}
    </section>
  );
};

const registerButtonHandler = (password, email) => {
  return (
    <button
      style={{
        pointerEvents:
          password !== "" && email !== "" && email.endsWith("@gmail.com")
            ? "auto"
            : "none",
        opacity:
          password !== "" && email !== "" && email.endsWith("@gmail.com")
            ? 1
            : 0.5,
      }}
      type="submit"
      className="Login-btn"
    >
      Login
    </button>
  );
};

const RegisterDetailsHandler = () => {
  return (
    <p className="Register-details">
      If not a dentee member ?{"  "}{" "}
      <Link to="/register" className="Register-link">
        Register
      </Link>
    </p>
  );
};

export default Login;
