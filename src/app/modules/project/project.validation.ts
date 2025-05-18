import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.string()).optional(),
  github_link_client: z.string().url().optional(),
  github_link_server: z.string().url().optional(),
  live_link: z.string().url().optional(),
});
