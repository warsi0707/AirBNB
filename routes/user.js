const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js")


router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}) ,userController.renderLogin)



router.get("/logout", userController.renderLogout)

module.exports =router