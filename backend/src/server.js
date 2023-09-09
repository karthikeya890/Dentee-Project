const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

require("dotenv").config();

const port = process.env.PORT;

const register = require("./routers/register");
const login = require("./routers/login");
const doctor = require("./routers/doctor");
const clinic = require("./routers/clinic");

app.use("/register", register);

app.use("/login", login);

app.use("/doctor", doctor);

app.use("/clinic", clinic);

app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
