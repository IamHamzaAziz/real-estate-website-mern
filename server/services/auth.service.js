import { User, OTP } from '../models/index.js'
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();

const salt = bycrypt.genSaltSync(10);
const secret = process.env.SECRET;

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.SENDER_EMAIL_SERVICE,
    host: process.env.SENDER_EMAIL_HOST,
    tls: { ciphers: "SSLv3" },
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });
};

const sendOTPEmail = async (email, otp, subject, heading, instructions) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: { address: process.env.SENDER_EMAIL },
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0d47a1; text-align: center;">${heading}</h2>
          <p style="font-size: 16px; color: #555;">Dear User,</p>
          <p style="font-size: 16px; color: #555;">
            Your OTP is <strong style="color: #0d47a1; font-size: 18px;">${otp}</strong>
          </p>
          <p style="font-size: 16px; color: #555;">${instructions}</p>
          <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 30px;">Thank you for using StyEstate. If you have any questions, feel free to contact us.</p>
        </div>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

export const signUp = async ({ name, email, password }) => {
  let checkEmail = await User.findOne({ email });
  if (checkEmail && checkEmail.isVerified) {
    throw { status: 400, message: "Email already in use" };
  }

  if (checkEmail) {
    checkEmail.name = name;
    checkEmail.password = bycrypt.hashSync(password, salt);
    await checkEmail.save();
    await OTP.findOneAndDelete({ email });
  } else {
    await User.create({
      name,
      email,
      password: bycrypt.hashSync(password, salt),
    });
  }

  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  await sendOTPEmail(
    email,
    otp,
    "Verify OTP",
    "Verify Your OTP",
    "Please use this OTP to complete your verification. It will expire and become invalid after <strong>10 minutes</strong>."
  );
  await OTP.create({ email, otp });
};

export const verifyOTP = async ({ email, otp, passwordReset }) => {
  const otpRecord = await OTP.findOne({ email, otp });
  if (!otpRecord) throw { status: 401, message: "Invalid OTP" };

  if (passwordReset) return { passwordReset: true };

  const user = await User.findOne({ email });
  user.isVerified = true;
  await user.save();

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    secret,
    { expiresIn: "7d" }
  );
  return {
    token,
    user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
  };
};

export const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: "Wrong Email" };

  if (!user.isVerified) {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    await OTP.findOneAndDelete({ email });
    await sendOTPEmail(
      email,
      otp,
      "Verify OTP",
      "Verify Your OTP",
      "Please use this OTP to complete your verification. It will expire and become invalid after <strong>10 minutes</strong>."
    );
    await OTP.create({ email, otp });
    throw { status: 401, message: "Email not verified" };
  }

  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch) throw { status: 400, message: "Wrong Password" };

  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    secret,
    { expiresIn: "7d" }
  );
  return {
    token,
    user: { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
  };
};

export const getProfile = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) reject({ status: 401, message: "Invalid token" });
      else resolve(info);
    });
  });
};

export const sendOTPPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: "User not found" };

  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  await sendOTPEmail(
    email,
    otp,
    "Verify OTP",
    "Use this OTP",
    "Please use this OTP and we will proceed you to reset password screen. This OTP expires and becomes invalid after <strong>10 minutes</strong>."
  );
  await OTP.create({ email, otp });
};

export const resetPassword = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 400, message: "User not found" };
  user.password = bycrypt.hashSync(password, salt);
  await user.save();
};