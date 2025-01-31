import { model, Schema } from "mongoose";

export interface ICart {
    name: string,
    description: string
}

const brandSchema = new Schema<ICart>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

})

const Brand = model('brand', brandSchema);

export default Brand;