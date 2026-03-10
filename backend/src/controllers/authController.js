const authModel = require("../models/auth.models");
const sendEmail = require("../config/mailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function registerController(req, res) {
  try {
    const { userName, phone, email, password } = req.body;

    const user = await authModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await authModel.create({
      userName,
      phone,
      email,
      password: hash,
      isVerified: false,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


    const verifyLink = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;

    const html = `
      <h2>Email Verification</h2>
      <p>Click the button below to verify your email</p>
      <a href="${verifyLink}" 
         style="padding:10px 20px;background:#4CAF50;color:white;text-decoration:none;">
         Verify Email
      </a>
    `;

    await sendEmail(newUser.email, "Verify your email", html);

res.cookie("token", token)


    res.status(201).json({
      message: "Registration successful. Please verify your email.",
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function verifyEmailController(req, res) {
  const token = req.params.token;

  if (!token) {
    return res.status(400).json({ message: "token is required" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await authModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: "invalid or expired token" });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    res.status(200).json({
      message: "login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function logoutController(req, res) {
  let token = req.cookies.token;
  await redis.set(token, "blacklisted");
  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerController,
  loginController,
  verifyEmailController,
  logoutController,
};
