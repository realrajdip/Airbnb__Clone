const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");


router
.route('/signup')
.get(userController.renderSignupForm)
.post( wrapAsync(userController.signup)); 

router
.route( '/login' )
.get(userController.renderLoginForm)
.post(
  savedRedirectUrl, // saves the redirect url in session before login
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
)

router.get("/logout", userController.logout);
 
module.exports = router;
