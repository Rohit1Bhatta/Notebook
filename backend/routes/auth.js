const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "1781twguytdfg7q6wduy&**%f*ckqsfdwydf16o8yfde!#$@$#!";





//ROUTE 1: Create a User using POST "api/suth/createUser": NO login required;

router.post(
  "/createUser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must be 8 characters").isLength({ min: 8 }),
    body("name", "Enetr a valid name").isLength({ min: 1 }),
  ],
  async (req, res) => {
    // If there are error, send Bad request(400) and error message
    let success = false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success ,errors: errors.array() });
      }

      //Check Whether the user with this email exists or not

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, errors: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const data = {
        user: {
          _id: user._id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json({ user });
      success= true;
      res.json({ success, authToken });

      // res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: error });
    }
  }
);




//ROUTER 2: Authentication of a user  using POST "api/auth/loginUser": NO login required;
router.post(
  "/loginUser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password can't be blanlk").exists(),
  ],
  async (req, res) => {
    // If there are error, send Bad request(400) and error message
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ success ,errors: "Try to login with corect Credentials" });
      }
      const passwordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCheck) {
        
        return res
          .status(400)
          .json({ success, errors: "Try to login with corect Credentials" });
      }
      // if password is correct we send the payload;
      const data = {
        user: {
          _id: user._id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success= true;
      res.json({success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ errors: error });
    }
  }
);




// ROUTE 3: Get logged in User Details using:POST "api/auth/getuser": Login required;
router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
try {
  userId= req.user._id;
  const user = await User.findOne({ _id: userId }).select("-password");
  res.send(user);
  
} catch (error) {
  console.log(error);
  res.status(500).json({ errors: error });
}


  })


  
module.exports = router;
