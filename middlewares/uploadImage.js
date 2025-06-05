const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  // filename: function (req, file, cb) {
  //   const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  // },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // check if this is used
    const filename = `upload-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb({ message: "Unsupported file format" }, false);
//   }
// };
const multerFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
    "image/svg+xml",       // ✅ for SVG files
    "application/pdf",     // ✅ for PDFs
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.warn(`Unsupported file: ${file.originalname}, Type: ${file.mimetype}`);
    cb(new Error("Unsupported file format"), false);
  }
};


const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  // limits: { fileSize: 1000000 },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB

});
const photoUploadMiddleware = uploadPhoto.fields([
  { name: 'featuredimage', maxCount: 1 },
  { name: 'siteplan', maxCount: 1 },
  { name: 'pdffile', maxCount: 1 },
  { name: 'propertySelectedImgs', maxCount: 10 },
  // { name: 'planimage', maxCount: 80 }
  // { name: 'citylogo', maxCount: 1 },
  
]);
// const photoUploadMiddleware = uploadPhoto.any(); 
// const uploadPhoto1 = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 1000000 },
// });
const photoUploadMiddleware1 = uploadPhoto.any(); // accept any form field name

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(file.path);
    })
  );
  next();
};

const blogImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "blogs", filename);

      await sharp(file.path)
        .resize(650, 400)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

const builderImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "builder", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

const featuredImageResize = async (req) => {
  if (!req.files.featuredimage || !Array.isArray(req.files.featuredimage)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.featuredimage.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "property", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const sitePlanResize = async (req) => {
  

  if (!req.files.siteplan || !Array.isArray(req.files.siteplan)) return;

  const processedFilenames = [];
 
  await Promise.all(
    req.files.siteplan.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "siteplan", filename);

      await sharp(file.path)
        .resize(800, 420)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const testimonialImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "testimonial", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};

const propertySelectedImgsResize = async (req) => {

  if (!req.files.propertySelectedImgs || !Array.isArray(req.files.propertySelectedImgs)) return;

  const processedFilenames = [];
  await Promise.all(
    req.files.propertySelectedImgs.map(async (file) => {
      
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "propertyimage", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push("public/images/propertyimage/"+filename);
    })
  );

  return processedFilenames;
};

const cityImgResize = async (req) => {

  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "city", filename);

      await sharp(file.path)
        .resize(755, 355)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file


      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};


const processFloorPlanImages = async (req) => {
  const processedFilenames = [];
  if (!req.planimage ) return [];

  
  var file=req.planimage
 
      const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
      const outputPath = path.join("public", "images", "propertyplan", filename);
      console.log("test2")
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Optional: delete original file after processing
      fs.unlinkSync(file.path);

      processedFilenames.push({
        index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
        filename,
        url: `public/images/propertyplan/${filename}`,
      });
 
  return processedFilenames;
};
const processFloorPlanImagesGet = async (req) => {
  const processedFilenames = [];
 
  if (!req.planimageget ) return [];

  var file=req.planimageget
      const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
      const outputPath = path.join("public", "images", "propertyplan", filename);
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Optional: delete original file after processing
      fs.unlinkSync(file.path);

      processedFilenames.push({
        index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
        filename,
        url: `public/images/propertyplan/${filename}`,
      });
  
  return processedFilenames;
};
const processLandingPlanGet = async (req) => {
  const processedFilenames = [];
  if (!req ) return [];

  var file=req.floorPlansgetnew
  
      const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
      const outputPath = path.join("public", "images", "landing", filename);
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Optional: delete original file after processing
      fs.unlinkSync(file.path);

      processedFilenames.push({
        index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
        filename,
        url: `public/images/landing/${filename}`,
      });
  
  return processedFilenames;
};
const processLandingPlan = async (req) => {
  const processedFilenames = [];
  
  if (!req.floorPlansnew ) return [];

  var file=req.floorPlansnew
      const filename = `floorplan-${Date.now()}-${file.originalname}.jpeg`;
      const outputPath = path.join("public", "images", "propertyplan", filename);
      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Optional: delete original file after processing
      fs.unlinkSync(file.path);

      processedFilenames.push({
        index: parseInt(file.fieldname.match(/\[(\d+)]/)[1]), // extract index from fieldname
        filename,
        url: `public/images/propertyplan/${filename}`,
      });
 
  return processedFilenames;
};

const amenityImgResize = async (req) => {
  if (!req.files || !Array.isArray(req.files)) return;

  const processedFilenames = [];

  const outputDir = path.join("public", "images", "amenity");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const filename = file.filename;
      const outputPath = path.join(outputDir, filename);

      if (isSvg) {
        // Copy SVG file
        fs.copyFileSync(file.path, outputPath);
        // await fs.promises.writeFile(outputPath, file.data);
      } else {
        // Resize non-SVG file
        await sharp(file.path)
          .resize(650, 400)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(outputPath);
      }

      // Optional cleanup
      fs.unlinkSync(file.path);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const bannerImageResize = async (req) => {
 
  const processedFilenames = [];
  await Promise.all(
    req.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "landing", filename);
      const ext = path.extname(file.originalname).toLowerCase();
      const isSvg = ext === '.svg';

      const outputDir = path.join("public", "images", "landing");
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

      if (isSvg) {
      const outputPath1 = path.join(outputDir, filename);
        
        // Copy SVG file
        fs.copyFileSync(file.path, outputPath1);
        // await fs.promises.writeFile(outputPath, file.data);
      } else {
      await sharp(file.path)
        .resize(1920, 1080)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      }

      // fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const aboutImageResize = async (req) => {
 
  if (!req.files.aboutimage || !Array.isArray(req.files.aboutimage)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.aboutimage.map(async (file) => {
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "landing", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
const gallerySelectedImgsResize = async (req) => {

  // if (!req.files.gallerySelectedImgs || !Array.isArray(req.files.gallerySelectedImgs)) return;

  const processedFilenames = [];
  await Promise.all(
    req.map(async (file) => {
      
      // const filename = `builder-${Date.now()}-${file.originalname}.jpeg`;
      const filename =file.filename
      const outputPath = path.join("public", "images", "landing", filename);

      await sharp(file.path)
        .resize(750, 450)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      fs.unlinkSync(file.path); // delete original uploaded file

      processedFilenames.push("public/images/landing/"+filename);
    })
  );

  return processedFilenames;
};
const groupFilesByFieldname = (files) => {
  const fileMap = {};
  files.forEach(file => {
    if (!fileMap[file.fieldname]) {
      fileMap[file.fieldname] = [];
    }
    fileMap[file.fieldname].push(file);
  });
  return fileMap;
};
const groupFilesByFieldname2 = (files) => {
  const fileMap = {};
  files.forEach(file => {
    // Normalize fieldname like gallerySelectedImgs[0] → gallerySelectedImgs
    const baseField = file.fieldname.replace(/\[\d+\]/, '');
    
    if (!fileMap[baseField]) {
      fileMap[baseField] = [];
    }
    fileMap[baseField].push(file);
  });
  return fileMap;
};
const processUploadedPDFs = async (req) => {
 
  if (!req.files.pdffile || !Array.isArray(req.files.pdffile)) return;

  const processedFilenames = [];

  await Promise.all(
    req.files.pdffile.map(async (file) => {
     
      const filename = file.filename;
      const outputPath = path.join("public", "images", "pdffile", filename);

      // Ensure destination directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Move file from temp location to target
      fs.renameSync(file.path, outputPath);

      processedFilenames.push(filename);
    })
  );

  return processedFilenames;
};
module.exports = { uploadPhoto, productImgResize, blogImgResize,builderImgResize,featuredImageResize,sitePlanResize,photoUploadMiddleware,testimonialImgResize,propertySelectedImgsResize ,cityImgResize,processFloorPlanImages,photoUploadMiddleware1,processFloorPlanImagesGet,amenityImgResize,bannerImageResize,aboutImageResize,gallerySelectedImgsResize,groupFilesByFieldname,groupFilesByFieldname2,processLandingPlanGet,processLandingPlan,processUploadedPDFs};
