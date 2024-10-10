import express from "express";
import ContactMessage from "../models/ContactMessageModel";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const contactRouter = express();

contactRouter.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.staus(400).json("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json("Invalid email format");
    }

    await ContactMessage.startTransaction();

    await ContactMessage.create({
      name,
      email,
      message,
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

    await ContactMessage.commitTransaction();

    res.status(200).json("Message sent successfully");
  } catch (error) {
    await ContactMessage.rollbackTransaction();
    res.status(500).json("Server Error");
    console.error(error);
  }
});
