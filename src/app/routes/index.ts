import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import { projectRouter } from "../modules/project/projcet.routes";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/projects',
        route: projectRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router