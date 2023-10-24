const { Car } = require("../models");
const imagekit = require("../lib/imageKit");
const Sequelize = require("sequelize");

const createPage = async (req, res) => {
  res.render("create.ejs");
};

const createCar = async (req, res) => {
  const { name, price, type, category, available } = req.body;
  const file = req.file;

  try {
    // dapatkan extension file nya
    const split = file.originalname.split(".");
    const extension = split[split.length - 1];

    // upload file ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    await Car.create({
      // nama atribut = nama req.body
      name,
      price,
      category,
      available,
      imageUrl: img.url,
    });
    res.redirect("/dashboard/admin");
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const findCars = async (req, res) => {
  try {
    const cars = await Car.findAll();

    res.render("index.ejs", {
      cars,
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
  createPage,
  createCar,
  findCars,
};
