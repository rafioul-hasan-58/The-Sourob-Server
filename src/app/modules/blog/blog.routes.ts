import { Router } from "express";
import { blogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidationSchema } from "./blog.validation";
import auth from "../../middlewares/auth";


const router = Router();

router.post('/write-blog',
    validateRequest(blogValidationSchema),
    auth(['admin']),
    blogController.writeBlog
);
router.get('/get-all-blogs',
    blogController.getAllBlogs
);
router.get('/get-single-blog/:id',
    blogController.getSingleBlog
);
router.patch('/edit-blog/:id',
    auth(['admin']),
    blogController.editBlog
);
router.delete('/delete-blog/:id',
    auth(['admin']),
    blogController.deleteBlog
);
export const blogRouter = router;