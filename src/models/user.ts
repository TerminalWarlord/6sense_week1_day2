import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "inactive", "banned"],
        default: "active"
    },
    lastLoggedInAt: Date
}, {
    timestamps: true
})

export const User = mongoose.model("User", userSchema);
