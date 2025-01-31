import { model, Schema } from "mongoose";

export interface IBrand {
    name: string,
    description: string
}

const brandSchema = new Schema<IBrand>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

const Brand = model('brand', brandSchema);

export default Brand;