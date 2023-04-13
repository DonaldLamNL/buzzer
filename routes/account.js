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
      verificationCode: null,
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
    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    const message = {
      from: "buzzerfobuzz@gmail.com",
      to: email,
      subject: "Your verification code",
      text: `Your verification code is ${verificationCode}. If this is not you, please ignore this email.`,
    };
    await transporter.sendMail(message);
    console.log("Email sent: " + message.to);
    user.verificationCode = verificationCode;
    await user.save();
    res.json({ state: true, message: "Sent. Please check email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: false, message: "Error sending email" });
  }
});

router.post("/forgot/reset", async (req, res) => {
  const { email, verificationCode, password } = req.body;
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      console.log("wrong email ");
      return res.status(400).json({ state: false, message: "Invalid email" });
    }
    if (user.verificationCode == verificationCode) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.verificationCode = null;
      await user.save();
      res.json({ state: true, message: "Password reset successful." });
    } else {
      res.status(400).json({ state: false, message: "Invalid verification code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ state: false, message: "Error resetting password" });
  }
});

router.get('/user', async (req, res) => {
  const { userid } = req.query;
  let decodedUser = decodeUserID(userid);

  try {
    const user = await Users.findOne({ userid: decodedUser });
    if (user) {
      const responseData = {
        userid: user.userid,
        username: user.username,
        description: user.description,
        email: user.email,
      }
      res.send(responseData);
    } else {
      res.send({ status: false, message: 'User not found' })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Reset password
router.post("/reset", async (req, res) => {
  const { userid, oldPassword, password } = req.body;
  const decodedUser = decodeUserID(userid);
  try {
    const user = await Users.findOne({ userid: decodedUser });
    if (!user) {
      return res.status(400).json({ state: false, message: "Invalid user" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      console.log("wrong password");
      return res.status(400).json({ state: false, message: "Wrong Password!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.json({ state: true, message: "Password reset successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ state: false, message: "Error resetting password" });
  }
});

// router.post("/forgot", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await Users.findOne({ email: email });
//     if (!user) {
//       console.log("wrong email ");
//       return res.status(400).json({ state: false, message: "Invalid email" });
//     }
//     const verificationCode = Math.floor(100000 + Math.random() * 900000);
//     const message = {
//       from: "buzzerfobuzz@gmail.com", // Replace with your Gmail address
//       to: email, // Replace with recipient's email address
//       subject: "Your verification code",
//       text: `Your verification code is ${verificationCode}. If this is not you, please ignore this email.`,
//     };
//     await transporter.sendMail(message);
//     console.log("Email sent: " + info.response);
//     user.verificationCode = verificationCode;
//     await user.save();
//     res.json({ state: true, message: "Sent. Please check email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ state: false, message: "Error sending email" });
//   }
// });

// router.post("/forgot/reset", async (req, res) => {
//   const { email, verificationCode, password } = req.body;
//   try {
//     const user = await Users.findOne({ email: email });
//     if (!user) {
//       console.log("wrong email ");
//       return res.status(400).json({ state: false, message: "Invalid email" });
//     }
//     if (user.verificationCode == verificationCode) {
//       user.password = password;
//       await user.save();
//       res.json({ state: true, message: "password reset." });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ state: false, message: "Error sending email" });
//   }
// });

module.exports = router;
