// userId
// productName
// description
// price
// productImage

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    }, 
    price: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    
    
}, { timestamps: true });

export default mongoose.model("Product", productSchema)