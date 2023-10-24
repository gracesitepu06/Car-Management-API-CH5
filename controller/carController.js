const { Car } = require("../models");
const imagekit = require("../lib/imageKit");
const Sequelize = require("sequelize");
const ApiError = require("../utils/apiError");
const upload = require("../middlewares/uploader");

const createCar = async (req, res, next) => {
  const { name, price, type, category, available } = req.body;
  const file = req.file;
  let img;

  try {
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadImage.url;
    }

    const newCar = await Car.create({
      // nama atribut = nama req.body
      name,
      price,
      category,
      available,
      imageUrl: img,
    });
    res.status(200).json({
      status: "success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCars = async (req, res, next) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const cars = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  // req.body
  const { name, price, category, available } = req.body;

  try {
    const cars = await Car.update(
      { name, price, category, available },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  // req.body
  // const { name, price, category, available } = req.body;

  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(new ApiError("Car dengan id tersebut gak ada", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarById,
  updateCar,
  deleteCar,
};
