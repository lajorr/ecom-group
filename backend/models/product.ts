import { model, ObjectId, Schema } from "mongoose";

export interface IProduct {
    name: string,
    brand: ObjectId,
    category: ObjectId,
    image: string,
    stock: number,
    price: string,
    offer_price: string | null,
    is_featured: boolean,
    description: string | null
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    offer_price: {
        type: String,
        default: null
    },
    is_featured: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        default: null
    }
}, { timestamps: true });

const Product = model<IProduct>('Product', productSchema);

export default Product;
