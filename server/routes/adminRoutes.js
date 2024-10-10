import express from "express";
import UserModel from "../models/UserModel.js";
import Blog from "../models/BlogModel.js";
import ContactMessage from "../models/ContactMessageModel.js";
import Property from "../models/PropertyModel.js";

const adminRouter = express();

adminRouter.get("/stats", async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments({});
    const propertyCount = await Property.countDocuments({});
    const contactMessageCount = await ContactMessage.countDocuments({});

    const verifiedUserCount = await UserModel.countDocuments({
      isVerified: true,
    });
    const unverifiedUserCount = await UserModel.countDocuments({
      isVerified: false,
    });

    res.status(200).json({
      blogCount,
      propertyCount,
      contactMessageCount,
      verifiedUserCount,
      unverifiedUserCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

export default adminRouter;
