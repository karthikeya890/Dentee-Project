const login = require("../controllers/login");
const { Router } = require("express");

const router = Router();

router.post("/", login);

module.exports = router;
