import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/", createMessage);
contactRouter.get("/", getMessages);
contactRouter.delete("/:id", deleteMessage);

export default contactRouter;