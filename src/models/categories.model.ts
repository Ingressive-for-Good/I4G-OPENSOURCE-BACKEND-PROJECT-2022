import mongoose, { Schema, model, Document } from "mongoose"

export interface ICategory extends Document {
    name: string;
}

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Category = model<ICategory>("category", categorySchema)

export default Category