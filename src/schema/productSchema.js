import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is mandatory"] },
    price: { type: Number },
    description: { type: String, trim: true },
    image: { type: [String] },
    category: { type: String, trim: true },
    subCategory: { type: String, trim: true },
    sizes: { type: Array },
    bestSeller: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const product = mongoose.model("Product", productSchema);
export default product;
