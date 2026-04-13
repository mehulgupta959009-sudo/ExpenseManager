const { check, validationResult } = require("express-validator");
const { authuser } = require("../models/authmodel.js");
const bcrypt = require("bcryptjs");

exports.postLoginPage = (req, res, next) => {
  console.log(req.url, req.method, req.body);

  const { email, password } = req.body;
  authuser.findOne({ email }).then(async (user) => {
    if (
      user &&
      user.password === password
      //  && bcrypt.compareSync(password, user.password)
    ) {
      req.session.isLoggedIn = true;
      req.session.userId = user._id.toString(); // Store user ID in session
      await req.session.save();
      console.log("login successful");
      return res.json({
        validation: "success",
      });
    } else {
      console.log("User not found");

      return res.status(422).json({
        validation: "fail",
      });
    }
  });
};

exports.postSignupPage = [
  check("fname")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters long"),

  check("lname")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters long"),

  check("email")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters long"),

  check("password")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters long"),

  (req, res, next) => {
    console.log(req.url, req.method, req.body);
    const { fname, lname, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        signIn: "fail",
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const newUser = new authuser({
          fname,
          lname,
          email,
          password,
          // : hashedPassword,
        });
        newUser.save();
      })
      .then(() => {
        console.log("User saved successfully");
        return res.json({
          signIn: "success",
        });
      });
  },
];

exports.logoutPage = (req, res, next) => {
  console.log(req.url, req.method);
  req.session.destroy(() => {
    console.log("Session destroyed successfully");
    res.redirect("/");
  });
  console.log("logged out");
};
