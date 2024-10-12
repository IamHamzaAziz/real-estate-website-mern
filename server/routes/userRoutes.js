import express from "express";
import Property from "../models/PropertyModel.js";
import User from "../models/UserModel.js";

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
  const { userId, propertyId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the property is in the savedProperties list
    if (!user.savedProperties.includes(propertyId)) {
      return res.status(400).json({ message: "Property is not saved" });
    }

    // Remove the property from savedProperties
    user.savedProperties.pull(propertyId);
    await user.save();

    res.status(200).json({ message: "Property unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;
