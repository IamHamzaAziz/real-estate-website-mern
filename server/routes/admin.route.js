import express from "express";
import { adminController } from "../controllers/index.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminController.fetchAdminStats);

export default adminRouter;