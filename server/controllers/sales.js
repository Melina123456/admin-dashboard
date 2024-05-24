import OverallStat from "../models/overallStat.model.js";

export const getSales = async (req, res) => {
  try {
    const overallStat = await OverallStat.find();

    res.status(200).json(overallStat[0]);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
