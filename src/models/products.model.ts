import mongoose, { Schema, model, Document } from "mongoose"
import {IUser} from "../modules/user/user.model"
import {ICategory} from "./categories.model"

interface IProduct extends Document {
    user: IUser["_id"];
    name: string;
    price: number;
    isSwappable: boolean;
    condition: "very good" | "good" | "bad" | "very bad";
    description: string;
    images: [string];
    category: ICategory["_id"];
}

const productSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isSwappable: {
        type: Boolean,
    },
    condition: {
        type: String,
        enum: ["very good", "good", "bad", "very bad"],
        default: "good"
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    },
})

const Product = model<IProduct>("product", productSchema)

export default Product