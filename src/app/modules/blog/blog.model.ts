import { Schema, model } from 'mongoose';

const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
            validate: {
                validator: function (arr: string[]) {
                    return arr.length > 0;
                },
                message: "At least one image URL is required",
            },
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const BlogModel = model<IBlog>('Blog', blogSchema);
