import mongoose from "mongoose";

const organizationMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    status: {
        type: String,
        enum: ["joined", "invited", "banned", "removed", "rejected"],
        default: "invited"
    },
    userType: {
        type: String,
        enum: ["owner", "admin", "user"],
        default: "user"
    },
    lastAccessedAt: {
        type: Date
    },
    joinedAt: {
        type: Date
    },
    invitedAt: {
        type: Date,
    }
}, {
    timestamps: true
});

organizationMemberSchema.index({ user: 1, organization: 1 }, { unique: true });
export const OrganizationMember = mongoose.model("OrganizationMember", organizationMemberSchema);