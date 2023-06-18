import { z } from 'zod';

export const createAcademicFecultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is require',
    }),
  }),
});
export const updateAcademicFecultyZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is require',
      })
      .optional(),
  }),
});

export const AcademicFecultyValidation = {
  createAcademicFecultyZodSchema,
  updateAcademicFecultyZodSchema,
};
