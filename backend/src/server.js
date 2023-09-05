const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173/"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome Home!!!");
});

app.listen(4000, () => {
  console.log(`server is running on port 4000`);
});
