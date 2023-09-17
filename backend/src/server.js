const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

require("dotenv").config();

const port = process.env.PORT;

const register = require("./routers/register");
const login = require("./routers/login");
const doctor = require("./routers/doctor");
const clinic = require("./routers/clinic");
const event = require("./routers/event");
const patient = require("./routers/patient");

app.use("/register", register);

app.use("/login", login);

app.use("/doctor", doctor);

app.use("/clinic", clinic);

app.use("/event", event);

app.use("/patient", patient);

app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
