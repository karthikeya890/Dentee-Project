const { Router } = require("express");
const { register } = require("../controllers/register");
const prisma = require("../prismaClient");
const router = Router();

const isEmailValidHandler = async (req, res, next) => {
  const { email } = req.body;

  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (response) {
    res.status(500).json({ message: "Email Already Exists" });
  } else {
    next();
  }
};

router.post("/", isEmailValidHandler, register);

module.exports = router;
