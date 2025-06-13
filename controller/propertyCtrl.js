const Property = require("../models/propertyModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { featuredImageResize,sitePlanResize,propertySelectedImgsResize,processUploadedPDFs } = require("../middlewares/uploadImage");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Propertyimage = require("../models/propertyimagesModel");

const createProperty = asyncHandler(async (req, res) => {
  try {
    console.log("pdfshow")
    console.log(req.files)
    if (req.files && Object.keys(req.files).length > 0) {
      var propertySelectedImgs  =[]
      if (req.files && req.files.propertySelectedImgs && req.files.propertySelectedImgs.length > 0  && Object.keys(req.files.propertySelectedImgs).length > 0 && Array.isArray(req.files.propertySelectedImgs)) {
        console.log("no propertySelectedImgs")
         propertySelectedImgs  = await propertySelectedImgsResize(req);
        if (propertySelectedImgs.length > 0) {
          // ✅ Append logo filename to req.body
          // console.log("Property Images:", propertySelectedImgs);
          req.body.propertyimageurl = propertySelectedImgs;
          
        }
      }
     
      if (req.files && req.files.featuredimage && Array.isArray(req.files.featuredimage) && req.files.featuredimage.length > 0 ) { 
        console.log(req.files.featuredimage)
        console.log("no featuredImageResize")
        const processedImages  =await featuredImageResize(req);
        if (processedImages.length > 0) {
          // ✅ Append logo filename to req.body
          req.body.featuredimageurl = "public/images/property/"+processedImages[0];
        }
      }
      if (req.files && req.files.siteplan && Array.isArray(req.files.siteplan) && req.files.siteplan.length > 0 ) { 
        
        console.log(req.files.siteplan)
        console.log("no siteplan")
        const processedImagesplan  =await sitePlanResize(req);

        if (processedImagesplan.length > 0) {
          // ✅ Append logo filename to req.body
          req.body.siteplanurl = "public/images/siteplan/"+processedImagesplan[0];
        }
      }
      if (req.files && req.files.pdffile && Array.isArray(req.files.pdffile) && req.files.pdffile.length > 0 ) { 
        
       
        const processedImagesplan  =await processUploadedPDFs(req);

        if (processedImagesplan.length > 0) {
          console.log("pdfshow processedImagesplan")
    console.log(processedImagesplan)
          // ✅ Append logo filename to req.body
          req.body.brochurepdf = "public/images/pdffile/"+processedImagesplan[0];
        }
      }
      
    }

    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    req.body.pricesqft = parseFloat(req.body.pricesqft.replace(/,/g, ""));

    const newProperty = await Property.create(req.body);
    if (propertySelectedImgs.length > 0) {
      // ✅ Append logo filename to req.body
      // console.log("Property Images:", propertySelectedImgs);
      // req.body.propertyimageurl = propertySelectedImgs;
      for(var i=0;i<propertySelectedImgs.length;i++){
        var propertyimage={
          "image":propertySelectedImgs[i],
          "propertyid":newProperty._id,
          "title":newProperty.title
        }
        const newProperty = await Propertyimage.create(propertyimage);

      }
    }
    //res.json(newProperty);
    const message={
      "status":"success",
      "message":"Data Add sucessfully",
      "data":newProperty
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});
const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    console.log("pdfshow")
    console.log(req.files)

    if (req.files && Object.keys(req.files).length > 0) {
      var  propertySelectedImgs  =[]
      if (req.files && req.files.propertySelectedImgs && req.files.propertySelectedImgs.length > 0  && Object.keys(req.files.propertySelectedImgs).length > 0 && Array.isArray(req.files.propertySelectedImgs)) {
        console.log("no propertySelectedImgs")
         propertySelectedImgs  = await propertySelectedImgsResize(req);
        if (propertySelectedImgs.length > 0) {
          // ✅ Append logo filename to req.body
          // console.log("Property Images:", propertySelectedImgs);
          req.body.propertyimageurl = propertySelectedImgs;
        }
      }
     
      if (req.files && req.files.featuredimage && Array.isArray(req.files.featuredimage) && req.files.featuredimage.length > 0 ) { 
       
        const processedImages  =await featuredImageResize(req);
        if (processedImages.length > 0) {
          // ✅ Append logo filename to req.body
          req.body.featuredimageurl = "public/images/property/"+processedImages[0];
        }
      }
      if (req.files && req.files.siteplan && Array.isArray(req.files.siteplan) && req.files.siteplan.length > 0 ) { 
        
        
        const processedImagesplan  =await sitePlanResize(req);

        if (processedImagesplan.length > 0) {
          // ✅ Append logo filename to req.body
          req.body.siteplanurl = "public/images/siteplan/"+processedImagesplan[0];
        }
      }
      if (req.files && req.files.pdffile && Array.isArray(req.files.pdffile) && req.files.pdffile.length > 0 ) { 
        
       
        const processedImagesplan  =await processUploadedPDFs(req);

        if (processedImagesplan.length > 0) {
          console.log("pdfshow processedImagesplan")
    console.log(processedImagesplan)
          // ✅ Append logo filename to req.body
          req.body.brochurepdf = "public/images/pdffile/"+processedImagesplan[0];
        }
      }
    }
    if (req.body.amenityid && typeof req.body.amenityid === "string") {
      req.body.amenityid = req.body.amenityid
        .split(",")
        .map((id) => new mongoose.Types.ObjectId(id.trim()));
    }
    req.body.slug  = slugify(req.body.slug.toLowerCase());
    req.body.admin_approve = true;
    // const getProperty = await Property.findById(id);
    // if (getProperty.propertyimageurl?.length > 0) {
    //   // ✅ Append logo filename to req.body
    //   // console.log("Property Images:", propertySelectedImgs);
    //   // req.body.propertyimageurl = propertySelectedImgs;
    //   for(var i=0;i<getProperty.propertyimageurl?.length;i++){
    //     var propertyimage={
    //       "image":getProperty.propertyimageurl[i],
    //       "propertyid":id,
    //       "title":getProperty.title
    //     }
    //     const newProperty = await Propertyimage.create(propertyimage);

    //   }
    // }
    // req.body.propertyimageurl=[];
    req.body.pricesqft = parseFloat(req.body.pricesqft.replace(/,/g, ""));


    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    if (propertySelectedImgs?.length > 0) {
      // ✅ Append logo filename to req.body
      // console.log("Property Images:", propertySelectedImgs);
      // req.body.propertyimageurl = propertySelectedImgs;
      for(var i=0;i<propertySelectedImgs?.length;i++){
        var propertyimage={
          "image":propertySelectedImgs[i],
          "propertyid":id,
          "title":req.body.title
        }
        const newProperty = await Propertyimage.create(propertyimage);

      }
    }
    
   
    const message={
      "status":"success",
      "message":"Data updated sucessfully",
      "data":updatedProperty
    }
    res.json(message);
    // res.json(updatedProperty);
  } catch (error) {
    console.error("Caught in route:", error);
    res.status(500).json({
      message: "Internal Server Error",
      ...(process.env.NODE_ENV !== 'production' && { error: err.message }),
    });
    throw new Error(error);
  }
});
const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":deletedProperty
    }
    res.json(message);
    // res.json(deletedProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const getProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getProperty = await Property.findById(id).populate('images').populate("floorplan");
    const message={
      "status":"success",
      "message":"Data deleted sucessfully ii",
      "data":getProperty
    }
    res.json(message);
    // res.json(getaProperty);
  } catch (error) {
    throw new Error(error);
  }
});
const getallProperty = asyncHandler(async (req, res) => {
  try {
    let limit=100;
    let skip=1;
    

    if (req.query.limit ) {
      limit=req.query.limit;
      skip=req.query.skip;     
  }
    // const getallProperty = await Property.find().populate("cityid").populate("categoryid").sort({updated_at: -1}).skip((skip - 1) * limit).limit(parseInt(limit)).lean();

    const [propertyList, totalCount] = await Promise.all([
          Property.find()
            .populate("cityid")
            .populate("categoryid")
            .sort({ _id: -1})
            .skip((skip - 1) * limit)
            .limit(limit)
            .lean(),
        
          Property.countDocuments() // total matching without skip/limit
        ]);
        // propertyList.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        // console.log(propertyList)
        res.status(200).json({
          items: propertyList,
          totalCount: totalCount,
          currentPage: skip,
          totalPages: Math.ceil(totalCount / limit)
        });
    // res.json(getallProperty);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createProperty,
  updateProperty,
  deleteProperty,
  getProperty,
  getallProperty,
};
