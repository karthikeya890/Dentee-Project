const prisma = require("../prismaClient");
const { verifyToken } = require("../utils/jwt");

const getClinics = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);

  try {
    const response = await prisma.clinic.findMany({
      where: {
        userId: id,
      },
      orderBy: [{ validTill: "desc" }],
      include: {
        user: true,
      },
    });

    if (response) {
      res.send(response);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addClinic = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);
  try {
    const response = await prisma.clinic.create({
      data: {
        ...req.body,
        userId: id,
      },
    });

    if (response) {
      res.send({ message: "Clinic Added successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getClinics, addClinic };
