import express from "express";
import User from "../models/UserModel.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import OTP from "../models/OTPModel.js";
import otpGenerator from "otp-generator";

dotenv.config();

const salt = bycrypt.genSaltSync(10);
const secret = process.env.SECRET;

const authRouter = express();

authRouter.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await User.find({ email: email });

    if (checkEmail.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: bycrypt.hashSync(password, salt),
    });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const transporter = nodemailer.createTransport({
      service: process.env.SENDER_EMAIL_SERVICE,
      host: process.env.SENDER_EMAIL_HOST,
      tls: {
        ciphers: "SSLv3",
      },
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: {
        address: process.env.SENDER_EMAIL,
      },
      to: email,
      subject: "Verify OTP",
      text: `Your OTP is ${otp}\nIt will expire and would be invalid after 10 minutes.`,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });

    await OTP.create({
      email: email,
      otp: otp,
    });

    res.status(200).json({ message: "Now verify OTP" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await OTP.findOne({ email: email, otp: otp });

    if (!otpRecord) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email: email });
    user.is_verified = true;
    await user.save();

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default authRouter;
