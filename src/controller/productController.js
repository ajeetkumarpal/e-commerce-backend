import { json } from "express";
import cloudinary from "../config/cloudinary.js";
import {
  createProduct,
  findAllProduct,
  findByIdAndDeleteProduct,
  findSingleProductById,
} from "../repository/productRepository.js";
const addProduct = async (req, res) => {
  console.log("start");
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    let images = [image1, image2, image3, image4].filter(
      (img) => img !== undefined,
    );

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    );

    const imageUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });

        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      price: Number(price),
      image: imageUrl,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true",
    };

    const newProduct = await createProduct(productData);

    res.status(201).json({
      message: "successfully uploaded",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const totalProduct = await findAllProduct();
    res.status(200).json({
      message: "successfully find product",
      success: true,
      data: totalProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await findByIdAndDeleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "successfully delete!",
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const singleProduct = await findSingleProductById(req.body.id);
    if (!singleProduct) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "successfully find product",
      success: true,
      data: singleProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
