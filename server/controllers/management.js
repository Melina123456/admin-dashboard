import User from "../models/User.model.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
