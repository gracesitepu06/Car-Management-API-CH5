const router = require("express").Router();
// const { Car } = require("../models");

const Car = require("../controller/carController");

const upload = require("../middlewares/uploader");

router.post("/", upload.single("image"), Car.createCar);
router.get("/", Car.findCars);
router.get("/:id", Car.findCarById);
router.patch("/:id", Car.updateCar);
router.delete("/:id", Car.deleteCar);

module.exports = router;
