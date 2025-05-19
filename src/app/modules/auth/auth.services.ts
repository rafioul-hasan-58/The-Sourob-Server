import AppError from "../../errors/AppError";
import { AdminModel } from "./auth.model"
import status from "http-status";
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { IAuthUser } from "../../interface/user";
const createAdmin = async (payload: IAdmin) => {
    const admin = await AdminModel.findOne({ email: "rafioulhasan2@gmail.com" });
    if (admin) {
        throw new AppError(status.ALREADY_REPORTED, "Admin already Exists")
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    const result = await AdminModel.create(payload);
    return result
}

const login = async (payload: { email: string; password: string }) => {
    const userData = await AdminModel.findOne({ email: payload.email });
    if (!userData) {
        throw new AppError(status.NOT_FOUND, "User not found!");
    }
    const isCorrectPassword = await bcrypt.compare(
        payload.password,
        userData.password
    );
    if (!isCorrectPassword) {
        throw new AppError(status.NOT_ACCEPTABLE, "Password doesn't match");
    }
    const tokenData = {
        email: userData.email,
        role: userData.role
    }
    const accessToken = createToken(
        tokenData,
        config.jwt.jwt_access_secret as string,
        config.jwt.jwt_access_expairs_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`
    )
    const refreshToken = createToken(
        tokenData,
        config.jwt.jwt_refresh_secret as string,
        config.jwt.jwt_refresh_expairs_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`
    )
    return {
        accessToken,
        refreshToken
    };
};
const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = verifyToken(token, config.jwt.jwt_refresh_secret as string);
    } catch (err) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized");
    }
    if (typeof decodedData === "string" || !("email" in decodedData)) {
        throw new AppError(status.NOT_ACCEPTABLE, "Invalid token payload");
    }
    const userData = await AdminModel.findOne({ email: decodedData.email })
    if (!userData) {
        throw new AppError(status.NOT_FOUND, "User not found!");
    }
    const tokenData = {
        email: userData.email,
        role: userData.role
    }
    const accessToken = createToken(
        tokenData,
        config.jwt.jwt_access_secret as string,
        config.jwt.jwt_access_expairs_in as `${number}s` | `${number}m` | `${number}h` | `${number}d`
    )
    return { accessToken };
};
const changePassword = async (
    user: IAuthUser,
    payload: { oldPassword: string; newPassword: string }
) => {
    const userData = await AdminModel.findOne({ email: user.email });
    if (!userData) {
        throw new AppError(status.NOT_FOUND, "User not found!");
    }

    const isCorrectPassword: boolean = await bcrypt.compare(
        payload.oldPassword,
        userData.password
    );

    if (!isCorrectPassword) {
        throw new AppError(status.NOT_ACCEPTABLE, "Password incorrect!");
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

    await AdminModel.updateOne({ email: userData.email }, { password: hashedPassword })

    return {
        message: "Password changed successfully!",
    };
};
export const authServices = {
    createAdmin,
    login,
    refreshToken,
    changePassword
}