import express from "express";
import ContactMessage from "../models/ContactMessageModel.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const contactRouter = express();

contactRouter.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json("Invalid email format");
    }

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
      subject: "Your Message is Recorded",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; color: #555; text-align: center">Dear ${name}</p>
              <p style="font-size: 16px; color: #555;">
                Your message has been received by the StyEstate team. We will review it and get back to you shortly.
              </p>
              <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 20px;">Thank you for using StyEstate.</p>
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

    await ContactMessage.create({
      name,
      email,
      message,
    });

    res.status(200).json("Message sent successfully");
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
});

contactRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const contactMessages = await ContactMessage.find({}, { updatedAt: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json(contactMessages);
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
});

contactRouter.delete("/:id", async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.status(200).json("Contact message deleted successfully");
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
});

export default contactRouter;
