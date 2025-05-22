import * as userService from "../services/user.service.js";

export async function saveProperty(req, res) {
  const { userId, slug } = req.body;
  try {
    await userService.saveProperty(userId, slug);
    res.status(200).json({ message: "Property saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function unsaveProperty(req, res) {
  const { userId, slug } = req.body;
  try {
    await userService.unsaveProperty(userId, slug);
    res.status(200).json({ message: "Property unsaved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getSavedProperties(req, res) {
  try {
    const userId = req.query.userId;
    const properties = await userService.getSavedProperties(userId);
    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function getUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const users = await userService.getUsers(page, limit);
    res.json(users);
  } catch (error) {
    res.status(500).json("Server Error");
  }
}

export async function searchUsers(req, res) {
  try {
    const { email } = req.body;
    const users = await userService.searchUsers(email);
    res.json(users);
  } catch (error) {
    res.status(500).json("Server Error");
  }
}

export async function toggleAdmin(req, res) {
  try {
    const userId = req.params.id;
    const isAdmin = await userService.toggleAdmin(userId);
    res.status(200).json({ message: "User admin status updated", isAdmin });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}