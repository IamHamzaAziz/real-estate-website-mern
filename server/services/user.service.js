import { User, Property } from "../models/index.js";

export async function saveProperty(userId, slug) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const property = await Property.findOne({ slug });
  if (!property) throw new Error("Property not found");
  if (user.savedProperties.includes(property._id)) throw new Error("Property already saved");
  user.savedProperties.push(property._id);
  await user.save();
  return;
}

export async function unsaveProperty(userId, slug) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const property = await Property.findOne({ slug });
  if (!property) throw new Error("Property not found");
  if (!user.savedProperties.includes(property._id)) throw new Error("Property is not saved");
  user.savedProperties.pull(property._id);
  await user.save();
  return;
}

export async function getSavedProperties(userId) {
  const user = await User.findById(userId).populate("savedProperties");
  if (!user) throw new Error("User not found");
  return user.savedProperties;
}

export async function getUsers(page = 1, limit = 8) {
  const skip = (page - 1) * limit;
  return User.find({}, { updatedAt: 0 }).skip(skip).limit(limit);
}

export async function searchUsers(email) {
  return User.find({ email: { $regex: email, $options: "i" } });
}

export async function toggleAdmin(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.isAdmin = !user.isAdmin;
  await user.save();
  return user.isAdmin;
}