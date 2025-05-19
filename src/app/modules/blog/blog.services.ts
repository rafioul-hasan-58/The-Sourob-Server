import status from "http-status";
import AppError from "../../errors/AppError";
import { BlogModel } from "./blog.model"

const writeBlog = async (payload: IBlog) => {
    const result = await BlogModel.create(payload);
    return result
}
const getAllBlogs = async () => {
    const result = await BlogModel.find();
    return result
}
const getSingleBlog = async (id: string) => {
    const result = await BlogModel.findById(id);
    if (!result) {
        throw new AppError(status.NOT_FOUND, 'Blog not found')
    }
    return result
}
const editBlog = async (id: string, payload: Partial<IBlog>) => {
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(status.NOT_FOUND, 'Blog not found')
    }
    const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true });
    return result
}
const deleteBlog = async (id: string) => {
    const blog = await BlogModel.findById(id);
    if (!blog) {
        throw new AppError(status.NOT_FOUND, 'Blog not found')
    }
    const result = await BlogModel.findByIdAndDelete(id);
    return result
}

export const blogServices = {
    writeBlog,
    getAllBlogs,
    getSingleBlog,
    editBlog,
    deleteBlog
}