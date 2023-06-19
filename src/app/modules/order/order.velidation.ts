import { z } from 'zod';

export const createOrdersZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is require',
    }),
  }),
});
export const updateOrdersZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is require',
      })
      .optional(),
  }),
});

export const OrdersValidation = {
  createOrdersZodSchema,
  updateOrdersZodSchema,
};
