import User from "../models/User.model.js";
import Transaction from "../models/transaction.model.js";
import OverallStat from "../models/overallStat.model.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    //hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDate = "2021-11-15";

    // Recent transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // overall stats
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStas = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDate;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStas,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
