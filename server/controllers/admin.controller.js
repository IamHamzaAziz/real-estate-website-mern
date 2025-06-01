import { adminService } from "../services/index.js";

export const fetchAdminStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("AdminController Error:", error);
    res.status(500).json("Server Error");
  }
};