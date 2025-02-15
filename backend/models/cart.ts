import { model, Schema } from "mongoose";


export interface ICart {
    product_name: string,
    product_id: string,
    price: number,
    quantity: number,
    sub_total: number,
    image: string

}
const cartSchema = new Schema<ICart>({
    product_name: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
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