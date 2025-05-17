import express from "express";
import { fetchAdminStats } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/stats", fetchAdminStats);

export default adminRouter;