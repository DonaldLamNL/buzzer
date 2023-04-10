const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../databaseSchema");
const { decodeUserID } = require("./commonfunct");

// User login
router.post("/login", async (req, res) => {
  const { usermsg, password } = req.body;

  try {
    // Check if user exists in database
    const user = await Users.findOne({
      $or: [{ email: usermsg }, { userid: usermsg }],
    });
    if (!user) {
      console.log("wrong email or user ID");
      return res
        .status(400)
        .json({ state: false, message: "Invalid email or user ID" });
    }

    // Check if password is correct using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("wrong password");
      return res.status(400).json({ state: false, message: "Wrong Password!" });
    }

    // Create and sign JWT token and set cookie
    const JWT_SECRET = "12345";
    const token = jwt.sign({ userid: user.userid }, JWT_SECRET);

    res.json({ state: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ state: false, message: "Internal Server Error" });
  }
});

// User signup
router.post("/signup", async (req, res) => {
  const { userid, username, email, password } = req.body;

  try {
    // Check if userid or email already exist in database
    const existingUser = await Users.findOne({ $or: [{ userid }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ state: false, message: "User ID or email already exists" });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = new Users({
      userid,
      username,
      email,
      password: hashedPassword,
      avatar: null,
      description: null,
      followers: [],
      followers: [],
      favour: [],
      isVerify: false,
      isAdmin: false,
    });

    await user.save();

    // Create and sign JWT token and set cookie
    const JWT_SECRET = "12345";
    const token = jwt.sign({ userid: user.userid }, JWT_SECRET);

    res.json({ state: true, message: "Signup successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ state: false, message: "Internal Server Error" });
  }
});

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "buzzerforbuzz@gmail.com",
    pass: "tgusxfyqeotutbxw",
  },
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      console.log("wrong email ");
      return res.status(400).json({ state: false, message: "Invalid email" });
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const message = {
      from: "buzzerfobuzz@gmail.com", // Replace with your Gmail address
      to: email, // Replace with recipient's email address
      subject: "Your verification code",
      text: `Your verification code is ${verificationCode}. If this is not you, please ignore this email.`,
    };
    await transporter.sendMail(message);
    console.log("Email sent: " + info.response);
    user.verificationCode = verificationCode;
    await user.save();
    res.json({ state: true, message: "Sent. Please check email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: false, message: "Error sending email" });
  }
});

module.exports = router;
