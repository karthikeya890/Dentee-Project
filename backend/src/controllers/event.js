const prisma = require("../prismaClient");
const { verifyToken } = require("../utils/jwt");

const getEvents = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);

  try {
    const response = await prisma.event.findMany({
      where: {
        userId: id,
      },
    });

    if (response) {
      res.send(response);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  const { authorization } = req.headers;
  const { id: userId } = await verifyToken(authorization);
  const { id, title, start, end, allDay } = req.body;
  try {
    const response = await prisma.event.create({
      data: {
        ...req.body,
        userId,
      },
    });

    if (response) {
      res.send({ message: "Event Added successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = await verifyToken(authorization);
  try {
    const response = await prisma.event.delete({
      where: {
        id: req.body.id,
      },
    });

    if (response) {
      res.send({ message: "Event Delete successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { authorization } = req.headers;
  const { id: userId } = await verifyToken(authorization);

  const { title, start, end, allDay } = req.body;

  try {
    const response = await prisma.event.update({
      data: {
        title,
        start,
        end,
        allDay,
        userId,
      },
      where: {
        id: req.body.id,
      },
    });
    if (response) {
      res.send({ message: "Event updated successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, addEvent, deleteEvent, updateEvent };
