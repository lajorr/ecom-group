import { model, Schema } from "mongoose";

export interface ICategory {
    name: string,
    description: string | null
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

const Category = model('category', categorySchema);

export default Category;