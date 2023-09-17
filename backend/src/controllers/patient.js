const prisma = require("../prismaClient");
const { verifyToken } = require("../utils/jwt");

const getPatients = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);

  try {
    const response = await prisma.patient.findMany({
      where: {
        userId: id,
      },
      orderBy: [{ createdAt: "asc" }],
    });

    if (response) {
      res.send(response);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addPatient = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);
  const { name, publicId, imageUrl, age, gender, email, dateOfBirth } =
    req.body;

  try {
    const response = await prisma.patient.create({
      data: {
        name,
        publicId,
        imageUrl,
        age,
        gender,
        email,
        dateOfBirth,
        createdAt: new Date(),
        userId: id,
      },
    });

    if (response) {
      res.send({ message: "Patient Added successfully." });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  const { authorization } = req.headers;
  const { id: userId } = await verifyToken(authorization);

  const id = parseInt(req.body.id);

  delete req.body.id;

  if (userId) {
    try {
      const response = await prisma.patient.update({
        data: {
          ...req.body,
        },
        where: {
          id,
        },
      });

      if (response) {
        res.send({ message: "Patient Updated successfully." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong." });
    }
  }
};

const deletePatient = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);

  if (id) {
    try {
      const response = await prisma.patient.delete({
        where: {
          id: req.body.id,
        },
      });

      if (response) {
        res.send({ message: "Patient Deleted successfully." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = { addPatient, getPatients, updatePatient, deletePatient };
