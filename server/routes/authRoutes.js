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
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail && checkEmail.isVerified) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (checkEmail) {
      checkEmail.name = name;
      checkEmail.password = bycrypt.hashSync(password, salt);
      await checkEmail.save();

      await OTP.findOneAndDelete({ email: email });
    } else {
      await User.create({
        name: name,
        email: email,
        password: bycrypt.hashSync(password, salt),
      });
    }

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
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #0d47a1; text-align: center;">Verify Your OTP</h2>
            <p style="font-size: 16px; color: #555;">Dear User,</p>
            <p style="font-size: 16px; color: #555;">
              Your OTP is <strong style="color: #0d47a1; font-size: 18px;">${otp}</strong>
            </p>
            <p style="font-size: 16px; color: #555;">
              Please use this OTP to complete your verification. It will expire and become invalid after <strong>10 minutes</strong>.
            </p>
            <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">Thank you for using StyEstate. If you have any questions, feel free to contact us.</p>
          </div>
        </div>
      `,
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
    user.isVerified = true;
    await user.save();

    jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;

        res.cookie("token", token).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Wrong Email" });
    }

    if (!user.isVerified) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

      await OTP.findOneAndDelete({ email: email });

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
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0d47a1; text-align: center;">Verify Your OTP</h2>
              <p style="font-size: 16px; color: #555;">Dear User,</p>
              <p style="font-size: 16px; color: #555;">
                Your OTP is <strong style="color: #0d47a1; font-size: 18px;">${otp}</strong>
              </p>
              <p style="font-size: 16px; color: #555;">
                Please use this OTP to complete your verification. It will expire and become invalid after <strong>10 minutes</strong>.
              </p>
              <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">Thank you for using StyEstate. If you have any questions, feel free to contact us.</p>
            </div>
          </div>
        `,
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

      return res.status(401).json({ message: "Email not verified" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;

        res.status(200).cookie("token", token).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

authRouter.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", "").json("ok");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default authRouter;
