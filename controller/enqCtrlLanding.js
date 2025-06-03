const EnquiryLanding = require("../models/enqLandingModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { enqueryLandingMail } = require("../middlewares/enqueryMail");


const createEnquiryLanding = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await EnquiryLanding.create(req.body);
    // const emailsend  =await enqueryLandingMail(req, res);
    const message={
      "status":"success",
      "message":"Thank you for your message. It has been sent.",
      "data":newEnquiry
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiryLanding = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedEnquiryLanding = await EnquiryLanding.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiryLanding);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiryLanding = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedEnquiryLanding = await EnquiryLanding.findByIdAndDelete(id);
    res.json(deletedEnquiryLanding);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryLanding = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaEnquiryLanding = await EnquiryLanding.findById(id);
    res.json(getaEnquiryLanding);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEnquiryLanding = asyncHandler(async (req, res) => {
  try {
    const getallEnquiryLanding = await EnquiryLanding.find().populate("landingpageid");
    res.json(getallEnquiryLanding);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createEnquiryLanding,
  updateEnquiryLanding,
  deleteEnquiryLanding,
  getEnquiryLanding,
  getallEnquiryLanding,
};
