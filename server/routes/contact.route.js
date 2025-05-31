import express from "express";
import { contactController } from "../controllers/index.js";

const contactRouter = express.Router();

contactRouter.post("/", contactController.createMessage);
contactRouter.get("/", contactController.getMessages);
contactRouter.delete("/:id", contactController.deleteMessage);

export default contactRouter;