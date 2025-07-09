const Location = require("../../models/locationModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId.js");


const getLocation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaLocation = await Location.findById(id).lean();
    res.json(getaLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getallLocation = asyncHandler(async (req, res) => {
  try {
    const getallLocation = await Location.find({"status":true}).populate('cityid').lean();
    res.json(getallLocation);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getLocation,
  getallLocation,
};
