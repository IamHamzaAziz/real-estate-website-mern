import UserModel from "../models/UserModel.js";
import Blog from "../models/BlogModel.js";
import ContactMessage from "../models/ContactMessageModel.js";
import Property from "../models/PropertyModel.js";

export const getAdminStats = async () => {
  try {
    const blogCount = await Blog.countDocuments({});
    const propertyCount = await Property.countDocuments({});
    const contactMessageCount = await ContactMessage.countDocuments({});
    const verifiedUserCount = await UserModel.countDocuments({ isVerified: true });
    const unverifiedUserCount = await UserModel.countDocuments({ isVerified: false });

    return {
      blogCount,
      propertyCount,
      contactMessageCount,
      verifiedUserCount,
      unverifiedUserCount,
    };
  } catch (error) {
    console.error("AdminService Error:", error);
    throw error; // Let the controller handle the response
  }
};