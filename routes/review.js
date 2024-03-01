const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn, validationReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require('../controllers/reviews.js')
//validation for reviewSchema


//POST Review Route

router.post(
  "/",isLoggedIn,
  validationReview,
  wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
