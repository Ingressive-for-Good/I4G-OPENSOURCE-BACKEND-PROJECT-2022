import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema)