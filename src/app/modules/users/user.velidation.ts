import { z } from 'zod';

export const createZodUserSchema = z.object({
  _id: z.string(),
  phoneNumber: z.string(),
  role: z.enum(['seller', 'buyer']),
  password: z.string(),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  address: z.string(),
  budget: z.number(),
  income: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
