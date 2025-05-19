import { z } from 'zod';

export const blogValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    images: z.array(z.string()).min(1, "At least one image is required"),
    description: z.string().min(1, "Description is required"),
});
