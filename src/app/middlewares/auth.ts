import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status"
import config from "../config"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
const auth = (requiredRole: string[]) => {
    return catchAsync(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // console.log(token,'token');
        if (!token) {
            throw new AppError(httpStatus.NOT_FOUND, "Token is not found")
        }

        const decoded = jwt.verify(token, config.jwt.jwt_access_secret as string) as JwtPayload;

        const { email, role } = decoded;
        // check if the user role is allowed to access the route
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is not allowed to access this route !');
        }
        req.user = decoded as JwtPayload;
        next()
    })
}


export default auth;