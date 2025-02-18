import { model, ObjectId, Schema } from "mongoose";


export interface ICart {
    product: ObjectId,
    price: number,
    quantity: number,
    sub_total: number,
    image: string

}
const cartSchema = new Schema<ICart>({
    product: {
        type: Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

export const Cart = model('cart', cartSchema);

export default Cart;