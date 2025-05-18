import ContactMessage from "../models/ContactMessageModel.js";
import nodemailer from "nodemailer";

// Nodemailer configuration
const transporter = nodemailer.createTransport({
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

export const sendContactEmail = async (name, email) => {
  const mailOptions = {
    from: { address: process.env.SENDER_EMAIL },
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
      </div>`,
  };

  await transporter.sendMail(mailOptions);
};

export const createContactMessage = async (name, email, message) => {
  return await ContactMessage.create({ name, email, message });
};

export const getPaginatedMessages = async (page = 1, limit = 8) => {
  const skip = (page - 1) * limit;
  return await ContactMessage.find({}, { updatedAt: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const deleteMessageById = async (id) => {
  return await ContactMessage.findByIdAndDelete(id);
};