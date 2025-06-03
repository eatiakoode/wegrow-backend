const Propertytype = require("../models/propertytypeModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createPropertytype = asyncHandler(async (req, res) => {
  try {
    const newPropertytype = await Propertytype.create(req.body);
    //res.json(newLocation);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newPropertytype
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePropertytype = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedPropertytype = await Propertytype.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPropertytype);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePropertytype = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedPropertytype = await Propertytype.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedPropertytype
    }
    res.json(message);
    // res.json(deletedPropertytype);
  } catch (error) {
    throw new Error(error);
  }
});
const getPropertytype = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getPropertytype = await Propertytype.findById(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getPropertytype
    }
    res.json(message);
    // res.json(getaLocation);
  } catch (error) {
    throw new Error(error);
  }
});
const getallPropertytype = asyncHandler(async (req, res) => {
  try {
    const getallPropertytype = await Propertytype.find().populate("categoryid");
    res.json(getallPropertytype);
  } catch (error) {
    throw new Error(error);
  }
});
const getPropertytypeCategoryId = asyncHandler(async (req, res) => {
  const { categoryid } = req.params;
  validateMongoDbId(categoryid);
  try {
    const getallPropertytype = await Propertytype.find({ categoryid: categoryid });
    const message={
      "status":"success",
      "message":"Data Propertytype sucessfully",
      "data":getallPropertytype
    }
    res.json(message);
   
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createPropertytype,
  updatePropertytype,
  deletePropertytype,
  getPropertytype,
  getallPropertytype,
  getPropertytypeCategoryId
};
