import { model, Schema } from "mongoose";


export interface ICart {
    product_name: string,
    price: number,
    quantity: number,
    sub_total: number,
    img_url: string

}
const cartSchema = new Schema<ICart>({
    product_name: {
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
    img_url: {
        type: String,
        required: true
    }
})

export const Cart = model('cart', cartSchema);

export default Cart;