const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100, // limit per IP
// });
// app.use(limiter);


const authRouter = require("./routes/authRoute");

const countryRouter = require("./routes/countryRouter");
const stateRouter = require("./routes/stateRouter");
const cityRouter = require("./routes/cityRoute");
const locationRouter = require("./routes/locationRouter.js");
const amenityRouter = require("./routes/amenityRouter.js");
const categoryRouter = require("./routes/categoryRoute");
const propertytypeRouter = require("./routes/propertytypeRoute");
const builderRouter = require("./routes/builderRouter");
const agentRouter = require("./routes/agentRouter");
const propertyRouter = require("./routes/propertyRouter");
const propertyImagesRouter = require("./routes/propertyImagesRouter");
const propertyPlanRouter = require("./routes/propertyPlanRouter");
const furnishingstatusRouter = require("./routes/furnishingstatusRouter");
const constructionstatusRouter = require("./routes/constructionstatusRouter");
const blogcategoryRouter = require("./routes/blogcategoryRoute");
const blogRouter = require("./routes/blogRouter");

const testimonialRouter = require("./routes/testimonialRouter");
const propertypageRouter = require("./routes/propertypageRouter");
const faqRouter = require("./routes/faqRouter");

const landingpageRouter = require("./routes/landingpageRouter");
const landingImagesRouter = require("./routes/landingImagesRouter");
const landingPlanRouter = require("./routes/landingPlanRouter");
const landingPaymentRouter = require("./routes/landingPaymentRouter");
const enqRouter = require("./routes/enqRoute");
const enqPropertyRouter = require("./routes/enqPropertyRoute");
const enqLandingRouter = require("./routes/enqLandingRoute");
const cityGlimpseRouter = require("./routes/cityGlimpseRouter");
const sellerRouter = require("./routes/sellerRouter");



// Frontend API route
const cityFrontendRoute = require("./routes/frontend/cityFrontendRoute");
const propertytypeFrontendRouter = require("./routes/frontend/propertytypeFrontendRouter");
const propertyFrontendRouter = require("./routes/frontend/propertyFrontendRouter");
const testimonialFrontendRouter = require("./routes/frontend/testimonialFrontendRouter");
const blogFrontendRouter = require("./routes/frontend/blogRouter");
const faqFrontendRouter = require("./routes/frontend/faqRouter");
const enqFrontendRouter = require("./routes/frontend/enqRoute");
const enqPropertyFrontendRouter = require("./routes/frontend/enqPropertyRouter");
const propertypageFrontendRoute = require("./routes/frontend/propertypageRouter");
const landingpageFrontendRoute = require("./routes/frontend/landingpageFrontendRoute");

const enqLandingFrontendRouter = require("./routes/frontend/enqLandingRoute");
const categoryFrontendRoute = require("./routes/frontend/categoryRoute");
const builderFrontendRoute = require("./routes/frontend/builderRoute");








const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const compression = require("compression");
app.use(compression());

// const bodyParser = require('body-parser');

// app.use(bodyParser.json({ limit: '10mb' })); // or more
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
app.use("/admin/api/user", authRouter);

app.use("/admin/api/country", countryRouter);
app.use("/admin/api/state", stateRouter);
app.use("/admin/api/city", cityRouter);
app.use("/admin/api/location", locationRouter);
app.use("/admin/api/amenity", amenityRouter);
app.use("/admin/api/category", categoryRouter);
app.use("/admin/api/propertytype", propertytypeRouter);
app.use("/admin/api/builder", builderRouter);
app.use("/admin/api/agent", agentRouter);
app.use("/admin/api/property", propertyRouter);
app.use("/admin/api/furnishingstatus", furnishingstatusRouter);
app.use("/admin/api/constructionstatus", constructionstatusRouter);
app.use("/admin/api/blogcategory", blogcategoryRouter);
app.use("/admin/api/blog", blogRouter);
app.use("/admin/api/testimonial", testimonialRouter);
app.use("/admin/api/propertypage", propertypageRouter);
app.use("/admin/api/faq", faqRouter);
app.use("/admin/api/propertyimages", propertyImagesRouter);
app.use("/admin/api/propertyplan", propertyPlanRouter);

app.use("/admin/api/landingpage", landingpageRouter);
app.use("/admin/api/landingimages", landingImagesRouter);
app.use("/admin/api/landingplan", landingPlanRouter);
app.use("/admin/api/landingpayment", landingPaymentRouter);
app.use("/admin/api/enquiry", enqRouter);
app.use("/admin/api/propertyenquiry", enqPropertyRouter);
app.use("/admin/api/landingenquiry", enqLandingRouter);
app.use("/admin/api/cityglimpse", cityGlimpseRouter);

app.use("/admin/api/seller", sellerRouter);


// Frontend API
app.use("/frontend/api/city", cityFrontendRoute);
app.use("/frontend/api/propertytype", propertytypeFrontendRouter);
app.use("/frontend/api/property", propertyFrontendRouter);
app.use("/frontend/api/testimonial", testimonialFrontendRouter);
app.use("/frontend/api/blog", blogFrontendRouter);
app.use("/frontend/api/faq", faqFrontendRouter);
app.use("/frontend/api/enquiry", enqFrontendRouter);
app.use("/frontend/api/propertyenquiry", enqPropertyFrontendRouter);
app.use("/frontend/api/propertypage", propertypageFrontendRoute);
app.use("/frontend/api/landingpage", landingpageFrontendRoute);
app.use("/frontend/api/landingenquiry", enqLandingFrontendRouter);
app.use("/frontend/api/category", categoryFrontendRoute);
app.use("/frontend/api/builder", builderFrontendRoute);



const path = require("path");
// app.use("/public", express.static(path.join(__dirname, "public")));
// app.use(express.static("public"));
// app.use('/images', express.static('path_to_images_directory'));
app.use('/public', express.static(path.join(__dirname, 'public')));
console.log("testimage")
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});
