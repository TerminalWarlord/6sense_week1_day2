import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

export const Organization = mongoose.model("Organization", organizationSchema);