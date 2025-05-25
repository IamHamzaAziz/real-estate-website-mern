import { Blog, Property, ContactMessage, User } from "../models/index.js";

export const getAdminStats = async () => {
  try {
    const blogCount = await Blog.countDocuments({});
    const propertyCount = await Property.countDocuments({});
    const contactMessageCount = await ContactMessage.countDocuments({});
    const verifiedUserCount = await User.countDocuments({ isVerified: true });
    const unverifiedUserCount = await User.countDocuments({ isVerified: false });

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