import mongoose, { Schema, model, Document } from "mongoose"
import {IUser} from "./user.model"
import {ICategory} from "./categories.model"

interface IProduct extends Document {
    userId: IUser["_id"];
    productName: string
    description: string
    price: number
    productImages: []
    isSwappable: boolean
    condition: "very good" | "good" | "bad" | "very bad"
    category: ICategory["_id"]
    createdAt: Date
    updatedAt: Date
}

const productSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }, 
        price: {
            type: Number,
            required: true
        },
        productImages: [
            {
                type: String,
                required: true
            }
        ],
        isSwappable: {
            type: Boolean,
        },
        condition: {
            type: String,
            enum: ["very good", "good", "bad", "very bad"],
            default: "good"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Category",
            required: true
        },
    },
    { 
        timestamps: true 
    }
);

const Product = model<IProduct>("product", productSchema)

export default Product