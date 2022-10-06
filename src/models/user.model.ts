// username
// firstname
// profilePicture
// lastname
// phoneNo
// password
// address
// isAdmin
// friends/follower
// userId
// productName
// description
// price
// productImage

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    }, 
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },  
    isAdmin: {
        type: Boolean,
        default: false
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }
    
}, { timestamps: true });

export default mongoose.model("Product", userSchema)