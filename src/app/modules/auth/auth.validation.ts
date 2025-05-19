import { z } from 'zod';

export const AdminValidationSchema = z.object({
  name: z.literal('Rafioul Hasan Sourob'),
  role: z.literal('admin'),
  password: z.string(),
  email: z.literal('rafioulhasan2@gmail.com'),
  image: z.literal('https://i.ibb.co/1JPrQPQh/portfolio.jpg'),
  phone: z.literal('01752966422'),
});
