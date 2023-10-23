const { Car } = require("../models");

const createCar = async (req, res) => {
  const { name, price, type, category, available } = req.body;
  try {
    const newCar = await Car.create({
      // nama atribut = nama req.body
      name,
      price,
      type,
      category,
      available,
    });
    res.status(200).json({
      status: "success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  createCar,
};
