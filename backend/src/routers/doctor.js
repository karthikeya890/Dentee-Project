const { doctorDetails, updateDoctorDetails } = require("../controllers/doctor");
const { Router } = require("express");

const router = Router();

router.get("/", doctorDetails);
router.put("/", updateDoctorDetails);

module.exports = router;
