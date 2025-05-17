import { getAdminStats } from "../services/admin.service.js";

export const fetchAdminStats = async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("AdminController Error:", error);
    res.status(500).json("Server Error");
  }
};