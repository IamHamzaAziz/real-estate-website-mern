import express from "express";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

userRouter.post("/save-property", userController.saveProperty);
userRouter.post("/unsave-property", userController.unsaveProperty);
userRouter.get("/saved-properties", userController.getSavedProperties);
userRouter.get("/", userController.getUsers);
userRouter.post("/search", userController.searchUsers);
userRouter.put("/toggle-admin/:id", userController.toggleAdmin);

export default userRouter;