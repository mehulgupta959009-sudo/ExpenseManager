const express = require("express");

const authRouter = express.Router();

const { postLoginPage } = require("./authcontroller");
const { logoutPage } = require("./authcontroller");
const { postSignupPage } = require("./authcontroller");

authRouter.post("/login", postLoginPage);
authRouter.post("/signup", postSignupPage);
authRouter.get("/logout", logoutPage);

exports.authRouter = authRouter;
