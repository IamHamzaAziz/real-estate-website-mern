import { contactService } from '../services/index.js';

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json("All fields are required");
    }

    if (!validateEmail(email)) {
      return res.status(400).json("Invalid email format");
    }

    await contactService.createContactMessage(name, email, message);
    await contactService.sendContactEmail(name, email);

    res.status(200).json("Message sent successfully");
  } catch (error) {
    console.error("CreateMessage Error:", error);
    res.status(500).json("Server Error");
  }
};

export const getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const messages = await contactService.getPaginatedMessages(page, limit);
    res.json(messages);
  } catch (error) {
    console.error("GetMessages Error:", error);
    res.status(500).json("Server Error");
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await contactService.deleteMessageById(req.params.id);
    res.status(200).json("Contact message deleted successfully");
  } catch (error) {
    console.error("DeleteMessage Error:", error);
    res.status(500).json("Server Error");
  }
};