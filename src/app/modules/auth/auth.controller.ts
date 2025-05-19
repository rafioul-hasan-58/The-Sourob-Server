import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import status from "http-status";
import { authServices } from "./auth.services";
import config from "../../config";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.createAdmin(req.body);
  res.status(status.OK).json({
    success: true,
    message: 'Admin added successfully',
    data: result
  })
})
const login = catchAsync(async (req: Request, res: Response) => {
  const user = await authServices.login(req.body);
  const { refreshToken, accessToken } = user;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  res.status(status.OK).json({
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: {
      accessToken
    }
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  res.status(status.OK).json({
    success: true,
    statusCode: 200,
    message: "Login refresh successful",
    data: result
  })
})
const changePassword = catchAsync(async (req: Request & { user?: any }, res: Response) => {

  const result = await authServices.changePassword(req.user, req.body);
  res.status(status.OK).json({
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
    data: result
  })
})

export const authController = {
  createAdmin,
  login,
  refreshToken,
  changePassword
}