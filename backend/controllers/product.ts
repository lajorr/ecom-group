import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

const handleGetAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await Product.find({})
      .populate("category", "name")
      .populate("brand", "name");
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const handleCreateNewProduct = async (req: Request, res: Response) => {
  try {
    const body: IProduct = req.body;
    if (
      !body ||
      !body.name ||
      !body.brand ||
      !body.category ||
      !body.image ||
      !body.stock ||
      !body.price
    ) {
      res.status(400).json({ msg: "Some Fields are missing" });
      return;
    }

    const newProduct: IProduct = await Product.create({
      name: body.name,
      brand: body.brand,
      category: body.category,
      image: body.image,
      stock: body.stock,
      price: body.price,
      offer_price: body.offer_price || null,
      is_featured: body.is_featured || false,
      description: body.description || null,
    });
    res.status(201).json({ msg: `${newProduct.name} has been created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const handleDeleteProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(productId);
    if (result === null) {
      res.status(400).json({ msg: "No Product Found" });
    }
    res.status(200).json({ msg: `product ${productId} has been deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const handleUpdateProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    if (!productId) {
      res.status(400).json({ msg: "No Product Found" });
      return;
    }

    const result = await Product.findByIdAndUpdate(productId, req.body);
    if (result === null) {
      res.status(400).json({ msg: "No product found" });
    }
    res.status(200).json({ msg: `product ${productId} has been updated` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export {
  handleCreateNewProduct,
  handleDeleteProductById,
  handleGetAllProducts,
  handleUpdateProductById,
};
