import { z } from 'zod';

export const createZodUserSchema = z.object({
  phoneNumber: z.string({}),
  role: z.enum(['seller', 'buyer']),
  password: z.string(),
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  address: z.string(),
  budget: z.number(),
  income: z.number(),
});
