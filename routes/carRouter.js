const router = require("express").Router();

const Car = require("../controller/carController");

router.post("/", Car.createCar);

module.exports = router;
