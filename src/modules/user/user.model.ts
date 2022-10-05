import { Schema, model, Document } from "mongoose"

interface IUser extends Document {
    firstname: string;
    lastname: string ;
    username: string ;
    phoneNo: string ;
    address: string ;
    profilePicture?: {
        imageUrl: string,
        imageId: string
    },
    status: "active" | "inactive" | "suspended",
    role: string
}

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilePicture: {
        imageUrl: String,
        imageId: String
    },
    status: {
        type: String,
        enum: [ "active" , "inactive" , "suspended" ],
        default: "inactive"
    },
    role: {
        type: String,
        role: "user"
    }

})

const User = model<IUser>("user", userSchema)

export default User