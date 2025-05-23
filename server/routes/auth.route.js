import express from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/verify-otp", authController.verifyOTP);
authRouter.post("/sign-in", authController.signIn);
authRouter.get("/profile", authController.getProfile);
authRouter.post("/logout", authController.logout);
authRouter.post("/send-otp-password-reset", authController.sendOTPPasswordReset);
authRouter.post("/reset-password", authController.resetPassword);

export default authRouter;