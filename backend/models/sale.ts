import { ObjectId, Schema } from "mongoose";

export interface ISale {
    productId: ObjectId;
    quantity: number;
    price: number;
    soldAt: Date;
}

const saleSchema = new Schema<ISale>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    soldAt: {
        type: Date,
        required: true
    },

});