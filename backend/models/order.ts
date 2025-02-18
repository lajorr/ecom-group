import { model, ObjectId, Schema } from "mongoose";


export interface IOrder {
    full_name: string,
    address: string,
    total_amount: number,
    cart_id: ObjectId,
    phone: number
}

const orderSchema = new Schema<IOrder>({
    full_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
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