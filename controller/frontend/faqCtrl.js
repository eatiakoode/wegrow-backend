const Faq = require("../../models/faqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");
const Property = require("../../models/propertyModel");


const getFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaFaq = await Faq.findById(id).lean();
    const message={
      "status":"success",
      "message":"Data Faq sucessfully",
      "data":getaFaq
    }
    res.json(message);
   //res.json(getaFaq);
  } catch (error) {
    throw new Error(error);
  }
});
const getallFaq = asyncHandler(async (req, res) => {
  try {
    const getallFaq = await Faq.find({"status":true}).lean();
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":getallFaq
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const getFaqPropertId = asyncHandler(async (req, res) => {
  const { propertyid } = req.params;
  validateMongoDbId(propertyid);
  try {
    const getallPropert = await Faq.find({ propertyid: propertyid ,"status":true}).lean();
    const message={
      "status":"success",
      "message":"Data Faq sucessfully",
      "data":getallPropert
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {
  getFaq,
  getallFaq,
  getFaqPropertId
};
