import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import TextField from "@mui/material/TextField";
import UploadImage from "../../../UploadImage/UploadImage";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { differenceInYears } from "date-fns";
import { useAddPatientMutation } from "../../../../api/patient";
import toast, { Toaster } from "react-hot-toast";
import "./AddPatientModal.css";

const AddPatientModel = () => {
  const [addPatient, { isSuccess, isError, data, error }] =
    useAddPatientMutation();

  useEffect(() => {
    console.log("rendered");
    if (isSuccess) {
      toast.success(data?.message);
      console.log("printed success add");
    } else if (isError) {
      toast.error(error?.data.message);
    }
  }, [isSuccess, isError]);

  const [details, setDetails] = useState({
    show: false,
    image: "",
    name: "",
    dob: null,
    age: "",
    gender: "",
    email: "",
    imageError: true,
    nameError: false,
    dobError: false,
    ageError: false,
    genderError: false,
    emailError: false,
    emailErrorValue: "This field is required",
  });

  const handleClose = () =>
    setDetails({
      show: false,
      image: "",
      name: "",
      dob: null,
      age: "",
      gender: "",
      email: "",
      imageError: true,
      nameError: false,
      dobError: false,
      ageError: false,
      genderError: false,
      emailError: false,
      emailErrorValue: "This field is required",
    });
  const handleShow = () =>
    setDetails((prevState) => ({ ...prevState, show: true }));

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-primary align-self-end my-3"
      >
        Add patient
      </button>
      <Offcanvas show={details.show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="user-select-none">
            Add patient
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column align-items-center">
          {UploadImage(details, setDetails)}

          <TextField
            className="w-100 my-4"
            error={details.nameError}
            id="outlined-required"
            label="Name"
            helperText={`${details.nameError ? "This field is required" : ""}`}
            value={details.name}
            onChange={(e) => {
              e.target.value !== ""
                ? setDetails((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                    nameError: false,
                  }))
                : setDetails((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                    nameError: true,
                  }));
            }}
          />

          <TextField
            className="w-100 mb-4 opacity-50"
            error={details.ageError}
            id="outlined-required"
            label="Age"
            helperText={`${details.ageError ? "This field is required" : ""}`}
            value={details.age}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              slotProps={{
                textField: {
                  helperText: details.dobError ? "Enter a valid Date" : "",
                },
              }}
              className="w-100 mb-4"
              label="DOB"
              value={details.dob}
              onChange={(newValue) => {
                if (newValue + "" === "Invalid Date") {
                  setDetails((prev) => ({
                    ...prev,
                    dob: newValue,
                    dobError: true,
                    age: "",
                    ageError: true,
                  }));
                } else {
                  const age = differenceInYears(new Date(), newValue);
                  setDetails((prev) => ({
                    ...prev,
                    dob: newValue,
                    dobError: false,
                    age,
                    ageError: false,
                  }));
                }
              }}
            />
          </LocalizationProvider>

          <FormControl
            sx={{ mb: 4, minWidth: "100%" }}
            error={details.genderError}
          >
            <InputLabel id="demo-select-small-label">Gender</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Patient"
              value={details.gender}
              onChange={(e) => {
                setDetails((prev) => ({
                  ...prev,
                  gender: e.target.value,
                  genderError: false,
                }));
              }}
            >
              <MenuItem value={"MALE"}>MALE</MenuItem>
              <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
            </Select>
            <FormHelperText>
              {details.genderError ? "This filed is required" : ""}
            </FormHelperText>
          </FormControl>

          <TextField
            className="gmailField w-100 mb-4"
            error={details.emailError}
            id="outlined-required"
            label="Email"
            helperText={`${details.emailError ? details.emailErrorValue : ""}`}
            value={details.email}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (e.target.value.endsWith("@gmail.com")) {
                  setDetails((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                    emailError: false,
                  }));
                } else {
                  setDetails((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                    emailError: true,
                    emailErrorValue: "Enter a valid @gmail.com Address",
                  }));
                }
              } else {
                setDetails((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                  emailError: true,
                  emailErrorValue: "This field is required",
                }));
              }
            }}
          />
          <div className="align-self-end">
            <button
              onClick={() => {
                const checkValuesArray = [
                  details.age,
                  details.email,
                  details.gender,
                  details.name,
                ];

                const checkErrorsArray = [
                  details.ageError,
                  details.emailError,
                  details.genderError,
                  details.nameError,
                ];

                const checkedValues = checkValuesArray.every(
                  (item) => item !== ""
                );

                const checkedErrors = checkErrorsArray.every(
                  (item) => !item === true
                );

                if (checkedValues === true && checkedErrors === true) {
                  const formData = new FormData();

                  formData.append("name", details.name);
                  formData.append("image", details.image);
                  formData.append("age", details.age);
                  formData.append("gender", details.gender);
                  formData.append("email", details.email);
                  formData.append("dateOfBirth", details.dob);

                  addPatient(formData);

                  handleClose();
                } else {
                  alert("Enter valid Details");
                }
              }}
              className="btn btn-primary mx-4"
            >
              Add
            </button>
            <button
              onClick={() => {
                setDetails({
                  show: true,
                  image: "",
                  name: "",
                  dob: null,
                  age: "",
                  gender: "",
                  email: "",
                  imageError: true,
                  nameError: false,
                  dobError: false,
                  ageError: false,
                  genderError: false,
                  emailError: false,
                  emailErrorValue: "This field is required",
                });
              }}
              className="btn btn-warning"
            >
              Reset
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AddPatientModel;
