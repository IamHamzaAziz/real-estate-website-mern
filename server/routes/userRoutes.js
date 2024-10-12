import express from "express";
import Property from "../models/PropertyModel.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const userRouter = express();

userRouter.post("/save-property", async (req, res) => {
  const { userId, slug } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const property = await Property.findOne({
      slug: slug,
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check if the property is already saved
    if (user.savedProperties.includes(property._id)) {
      return res.status(400).json({ message: "Property already saved" });
    }

    // Add property to user's savedProperties
    user.savedProperties.push(property._id);
    await user.save();

    res.status(200).json({ message: "Property saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.post("/unsave-property", async (req, res) => {
  const { userId, slug } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    const property = await Property.findOne({
      slug: slug,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the property is in the savedProperties list
    if (!user.savedProperties.includes(property._id)) {
      return res.status(400).json({ message: "Property is not saved" });
    }

    // Remove the property from savedProperties
    user.savedProperties.pull(property._id);
    await user.save();

    res.status(200).json({ message: "Property unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/saved-properties", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find the user and populate their saved properties
    const user = await User.findById(userId).populate("savedProperties");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.savedProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const users = await User.find({}, { updatedAt: 0 }).skip(skip).limit(limit);
    res.json(users);
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
});

userRouter.post("/search", async (req, res) => {
  try {
    const { email } = req.body;
    const users = await User.find({ email: { $regex: email, $options: "i" } }); // 'i' for case-insensitive search
    res.json(users);
  } catch (error) {
    res.status(500).json("Server Error");
    console.error(error);
  }
});

userRouter.put("/toggle-admin/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = !user.isAdmin; // Toggle admin status
    await user.save();

    res
      .status(200)
      .json({ message: "User admin status updated", isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
});

export default userRouter;
