import catchAsync from "../../utils/catchAsync";
import status from "http-status";
import { blogServices } from "./blog.services";
import { Request, Response } from "express";

const writeBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.writeBlog(req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Blog added successfully',
        statusCode: 201,
        data: result
    })
})
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.getAllBlogs();
    res.status(status.OK).json({
        success: true,
        message: 'All blogs fetched successfully',
        statusCode: 201,
        data: result
    })
})
const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.getSingleBlog(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Blog fetched successfully',
        statusCode: 201,
        data: result
    })
})
const editBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await blogServices.editBlog(req.params.id, req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Blog edited successfully',
        statusCode: 201,
        data: result
    })
})
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    await blogServices.editBlog(req.params.id, req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: 201,
        data: null
    })
})

export const blogController = {
    writeBlog,
    getAllBlogs,
    getSingleBlog,
    editBlog,
    deleteBlog
}