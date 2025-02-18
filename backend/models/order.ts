import { model, ObjectId, Schema } from "mongoose";


export interface IOrder {
    address: string,
    total_amount: number,
    cart_id: ObjectId
}

const orderSchema = new Schema<IOrder>({
    address: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    cart_id: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    }

})

export const Order = model('order', orderSchema);