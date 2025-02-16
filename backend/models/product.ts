import { model, ObjectId, Schema } from "mongoose";

export interface IProduct {
  name: string;
  brand: ObjectId;
  category: ObjectId;
  image: string;
  stock: number;
  price: number;
  offer_price?: number;
  is_featured: boolean;
  description?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offer_price: {
      type: Number,
      default: null,
    },
    is_featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
