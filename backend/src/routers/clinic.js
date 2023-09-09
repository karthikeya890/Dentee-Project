const { getClinics, addClinic } = require("../controllers/clinic");
const { Router } = require("express");
const router = Router();

router.get("/all", getClinics);
router.post("/", addClinic);

module.exports = router;
