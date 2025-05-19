import { Router } from "express";
import { messageController } from "./message.controller";
import validateRequest from "../../middlewares/validateRequest";
import { messageValidationSchema } from "./message.validation";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/send-message',
    validateRequest(messageValidationSchema),
    messageController.sendMessage
);
router.get('/get-all-messages',
    auth(['admin']),
    messageController.getAllMessage
);
router.get('/get-single-message/:id',
    auth(['admin']),
    messageController.getSingleMessage
);
router.delete('/remove-message/:id',
    auth(['admin']),
    messageController.removeMessage
)
export const messageRouter = router;