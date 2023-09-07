const prisma = require("../prismaClient");
const { verifyToken } = require("../utils/jwt");

const doctorDetails = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);
  try {
    const response = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (response)
      return res.send({ name: response.name, status: response.status });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateDoctorDetails = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);
  try {
    const response = await prisma.user.update({
      where: {
        id,
      },
      data: req.body,
    });

    if (response)
      return res.send({ name: response.name, status: response.status });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { doctorDetails, updateDoctorDetails };
