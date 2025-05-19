import { Router } from "express";
import { projectRouter } from "../modules/project/projcet.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { blogRouter } from "../modules/blog/blog.routes";
import { messageRouter } from "../modules/message/message.routes";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/projects',
        route: projectRouter
    },
    {
        path: '/blogs',
        route: blogRouter
    },
    {
        path: '/messages',
        route: messageRouter
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router