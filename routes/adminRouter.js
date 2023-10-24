const router = require("express").Router();
// const { Car } = require("../models");

const Admin = require("../controller/adminController");

const upload = require("../middlewares/uploader");

router.get("/dashboard/admin", Admin.findCars);
router.get("/dashboard/admin/create", Admin.createPage);
router.post("/products/create", upload.single("image"), Admin.createCar);

module.exports = router;
