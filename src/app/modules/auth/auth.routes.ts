import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationSchema } from './auth.validation';
import auth from '../../middlewares/auth';


const router = Router();

router.post('/register-admin',
    validateRequest(AdminValidationSchema),
    authController.createAdmin);
router.post('/login',
    authController.login
)
router.post('/refresh-token',
    authController.refreshToken
)
router.patch('/change-password',
    auth(["admin"]),
    authController.changePassword

)
export const authRouter = router;