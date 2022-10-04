import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: {
      type: [String],
      required: [true, "A product must have a category"],
    },
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    isSwapable: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String,
      required: [true, "Provide the conditon of the product"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A product  must have a description"],
      trim: true,
    },

    availabilty: {
      type: String,
      required: [true, "A product must have availabilty"],
      enum: {
        values: ["Available", "Unavailable"],
        message: "Available is either: Available or Unavailable",
      },
      default: "Available",
    },
    images: [
      {
        publicId: {
          type: String,
        },
        secureUrl: {
          type: String,
        },
      },
    ],
    sellerId: {
      type: String,
    },
  },
  { timestamps: true }
);
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
