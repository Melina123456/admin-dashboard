import Product from "../models/product.model.js";
import ProductStat from "../models/productStat.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product?._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productWithStats);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
