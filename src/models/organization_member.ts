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
        enum: ["joined", "invited", "banned", "removed"],
        default: "invited"
    },
    userType: {
        type: String,
        enum: ["owner", "admin", "user"],
        default: "user"
    },
    joinedAt: {
        type: Date
    },
    invitedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

organizationMemberSchema.index({ user: 1, organization: 1 }, { unique: true });
export const Organization = mongoose.model("OrganizationMember", organizationMemberSchema);