import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/property", propertyRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT);
