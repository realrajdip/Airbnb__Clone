if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require('../cloudConfig.js'); 
const upload = multer({ storage });
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validationListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validationListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//exports router object
module.exports = router;
