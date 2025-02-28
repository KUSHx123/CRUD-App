import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  body: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
  userId: z.number().int().positive(),
});