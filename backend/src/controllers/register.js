const prisma = require("../prismaClient");
const generatePassword = require("../utils/password-generator");
const { hashPassword } = require("../utils/bcrypt");
const { mailPassword } = require("../utils/send-mails");

const register = async (req, res) => {
  const { name, email, role, createdAt = new Date() } = req.body;

  const randomPassword = generatePassword();

  const hashedPassword = await hashPassword(randomPassword);

  try {
    const response = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        createdAt,
      },
    });

    if (response) {
      mailPassword(name, email, randomPassword, res);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register };
