import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../api/register";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Api

  const [registerApi, { isSuccess, data, isError, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    } else if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError]);

  const onSubmitFormHandler = (e) => {
    e.preventDefault();

    const body = {
      name,
      email,
      role: "ADMIN",
    };

    registerApi(body);

    setName("");
    setEmail("");
  };

  return (
    <div className="Register-container">
      <Header />
      <main className="Register-main-container">
        <img
          alt="doctors-img"
          src="https://res.cloudinary.com/dcm21aeqp/image/upload/v1692043877/doctors-min_mymjjw.jpg"
          className="Register-doctors-img"
          loading="lazy"
        />
        <form
          className="Register-form-container"
          onSubmit={onSubmitFormHandler}
        >
          <h3 className="Register-form-header">Registration</h3>
          {nameSectionHandler(name, setName, nameError, setNameError)}
          {emailSectionHandler(email, setEmail, emailError, setEmailError)}
          {registerButtonHandler(name, email)}
          {LoginDetailsHandler()}
        </form>
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </div>
  );
};

const nameSectionHandler = (name, setName, nameError, setNameError) => {
  //
  const onChangeNameHandler = (e) => {
    const value = e.target.value;
    setName(value);
    value === "" ? setNameError(true) : setNameError(false);
  };

  return (
    <section className="Register-form-section">
      <label htmlFor="name" className="Register-form-label">
        Name *
      </label>
      <input
        id="name"
        className="Register-form-input"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={onChangeNameHandler}
      />
      {nameError && (
        <p className="Register-form-error">Provide a valid Name*</p>
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
    <section className="Register-form-section">
      <label htmlFor="name" className="Register-form-label">
        Email *
      </label>
      <input
        id="name"
        className="Register-form-input"
        type="text"
        placeholder="Example@gmail.com"
        value={email}
        onChange={onChangeEmailHandler}
      />
      {emailError && (
        <p className="Register-form-error">Provide a valid Email*</p>
      )}
    </section>
  );
};

const registerButtonHandler = (name, email) => {
  return (
    <button
      style={{
        pointerEvents:
          name !== "" && email !== "" && email.endsWith("@gmail.com")
            ? "auto"
            : "none",
        opacity:
          name !== "" && email !== "" && email.endsWith("@gmail.com") ? 1 : 0.5,
      }}
      type="submit"
      className="Register-btn"
    >
      Register
    </button>
  );
};

const LoginDetailsHandler = () => {
  return (
    <p className="Login-details">
      Already a dentee member ?{"  "}{" "}
      <Link to="/login" className="Login-link">
        Login
      </Link>
    </p>
  );
};

export default Register;
