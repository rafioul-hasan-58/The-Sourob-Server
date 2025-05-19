import status from "http-status";
import AppError from "../../errors/AppError";
import { MessageModel } from "./message.model"


const sendMessage = async (payload: IMessage) => {
    const result = await MessageModel.create(payload);
    return result
}
const getAllMessage = async () => {
    const result = await MessageModel.find();
    return result
}
const getSingleMessage = async (id: string) => {
    const result = await MessageModel.findById(id);
    if (!result) {
        throw new AppError(status.NOT_FOUND, 'Message not found')
    }
    return result
}
const removeMessage = async (id: string) => {
    const message = await MessageModel.findById(id);
    if (!message) {
        throw new AppError(status.NOT_FOUND, 'Message not found')
    }
    const result = await MessageModel.findByIdAndDelete(id);
    return result
}
export const messageServices = {
    sendMessage,
    getAllMessage,
    getSingleMessage,
    removeMessage
}