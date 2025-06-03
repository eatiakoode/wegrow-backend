const express = require("express");
const {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation,
  getallLocation,
  getLocationCityId
} = require("../controller/locationCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createLocation);
router.put("/:id", authMiddleware, isAdmin, updateLocation);
router.delete("/:id", authMiddleware, isAdmin, deleteLocation);
router.get("/byid/:id", getLocation);
router.get("/", getallLocation);
router.get("/bycity/:cityid", getLocationCityId);

module.exports = router;
