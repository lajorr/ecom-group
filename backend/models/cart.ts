import { model, ObjectId, Schema } from "mongoose";


export interface ICart {
    items: {
        product: ObjectId,
        quantity: number,
        sub_total: number,
    }[],
    cart_total: number,
    status: "pending" | "paid"

}
const cartSchema = new Schema<ICart>({
    items: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
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
            }
        ],
        default: []
    },

    cart_total: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'paid'],
        default: 'pending'
    }

})

export const Cart = model('cart', cartSchema);

export default Cart;

