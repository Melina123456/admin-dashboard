import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//DATA IMPORTS
import User from "./models/User.model.js";
import Product from "./models/product.model.js";
import ProductStat from "./models/productStat.model.js";
import Transaction from "./models/transaction.model.js";
import OverallStat from "./models/overallStat.model.js";
import AffiliateStat from "./models/affiliateStat.model.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose setup
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server PORT: ${PORT} connected successfully`);
    });
    // only one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((error) => {
    console.log(`${error} did not connect.`);
  });
