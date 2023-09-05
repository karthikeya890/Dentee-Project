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

app.use("/register", register);

app.listen(port, () => {
  console.log(`server is running on  ${port}`);
});
