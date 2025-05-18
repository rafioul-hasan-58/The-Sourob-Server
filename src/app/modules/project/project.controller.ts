import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { projectServices } from "./project.services"
import status from "http-status"


const addProject = catchAsync(async (req: Request, res: Response) => {
    const result = await projectServices.addProject(req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Project added successfully',
        statusCode: 201,
        data: result
    })
})
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const result = await projectServices.getAllProjects();
    res.status(status.OK).json({
        success: true,
        message: 'All Projects fetched successfully',
        statusCode: status.OK,
        data: result
    })
})
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
    const result = await projectServices.getSingleProject(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Project fetched successfully',
        statusCode: status.OK,
        data: result
    })
})
const updateProject = catchAsync(async (req: Request, res: Response) => {
    const result = await projectServices.updateProject(req.params.id, req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Project updated successfully',
        statusCode: status.OK,
        data: result
    })
})
const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const result = await projectServices.deleteProject(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Project deleted successfully',
        statusCode: status.OK,
        data: result
    })
})

export const projectController = {
    addProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject
}