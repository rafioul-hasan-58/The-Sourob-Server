import AppError from "../../errors/AppError";
import { Project } from "./project.model"
import status from "http-status";

const addProject = async (payload: IProject) => {
    const result = await Project.create(payload);
    return result
}

const getAllProjects = async () => {
    const result = await Project.find();
    return result
}
const getSingleProject = async (id: string) => {
    const result = await Project.findById(id);
    return result
}
const updateProject = async (id: string, payload: Partial<IProject>) => {
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(status.NOT_FOUND, 'Project not found');
    }
    const result = await Project.findByIdAndUpdate(id, payload, { new: true });
    return result
}

const deleteProject = async (id: string) => {
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(status.NOT_FOUND, 'Project not found');
    }
    const result = await Project.findByIdAndDelete(id);
    return result;
}

export const projectServices = {
    addProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject
}