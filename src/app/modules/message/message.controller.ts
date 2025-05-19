import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { messageServices } from "./message.services";
import status from "http-status";



const sendMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await messageServices.sendMessage(req.body);
    res.status(status.OK).json({
        success: true,
        message: 'Message Sent',
        data: result
    })
})
const getAllMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await messageServices.getAllMessage();
    res.status(status.OK).json({
        success: true,
        message: 'All messages fetched',
        data: result
    })
})
const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await messageServices.getSingleMessage(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Message fetched',
        data: result
    })
})
const removeMessage = catchAsync(async (req: Request, res: Response) => {
    const result = await messageServices.removeMessage(req.params.id);
    res.status(status.OK).json({
        success: true,
        message: 'Message removed',
        data: result
    })
})

export const messageController = {
    sendMessage,
    getAllMessage,
    getSingleMessage,
    removeMessage
}