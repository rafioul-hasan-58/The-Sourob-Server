import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        images: {
            type: [String]
        },
        github_link_client: {
            type: String,
            unique: true
        },
        github_link_server: {
            type: String,
            unique: true
        },
        live_link: {
            type: String,
            unique: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);


export const Project = mongoose.model("Project", projectSchema);
