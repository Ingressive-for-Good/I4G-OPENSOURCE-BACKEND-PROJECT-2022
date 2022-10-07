import mongoose, { Schema, model, Document } from "mongoose"

export interface IUser extends Document {
    username: string;
    firstname: string;
    lastname: string;
    profilePicture: string;
    phoneNo: string;
    password: string;
    address: string;
    isAdmin: boolean;
    followers: []
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema({
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
        type: Array,
        default: []
    }
    
}, { timestamps: true });

const User = model<IUser>("user", userSchema)

export default User