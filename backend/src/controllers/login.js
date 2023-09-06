const prisma = require("../prismaClient");
const { comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (response) {
      const isPasswordValid = await comparePassword(
        password,
        response.password
      );

      if (isPasswordValid) {
        const token = await generateToken({
          id: response.id,
        });

        return res.send({ jwtToken: token });
      } else {
        res
          .status(400)
          .json({ message: "Incorrect password. Please try Again." });
      }
    } else {
      res.status(400).json({
        message: "The Email address is not associated with any account.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = login;
