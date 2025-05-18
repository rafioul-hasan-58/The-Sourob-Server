import { Router } from "express";
import { projectController } from "./project.controller";
import validateRequest from "../../middlewares/validateRequest";
import { projectValidationSchema } from "./project.validation";

const router = Router();

router.post('/add-project', validateRequest(projectValidationSchema), projectController.addProject);
router.get('/get-all-projects', projectController.getAllProjects);
router.get('/get-single-project/:id',projectController.getSingleProject);
router.patch('/update-project/:id',projectController.updateProject);
router.delete('/delete-project/:id',projectController.deleteProject);

export const projectRouter = router;