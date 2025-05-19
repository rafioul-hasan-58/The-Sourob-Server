import { Router } from "express";
import { blogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidationSchema } from "./blog.validation";


const router = Router();

router.post('/write-blog',
    validateRequest(blogValidationSchema),
    blogController.writeBlog
);
router.get('/get-all-blogs',
    blogController.getAllBlogs
);
router.get('/get-single-blog/:id',
    blogController.getSingleBlog
);
router.patch('/edit-blog/:id',
    blogController.editBlog
);
router.delete('/delete-blog',
    blogController.deleteBlog
)
export const blogRouter = router;