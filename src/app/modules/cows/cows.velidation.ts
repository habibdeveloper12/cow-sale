import { z } from 'zod';
import { Breed, Category, Label, Location } from './cows.enum';

export const createCowsZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is require',
    }),
    age: z
      .number({
        required_error: 'Age is require',
      })
      .positive(),
    price: z
      .number({
        required_error: 'Price is require',
      })
      .positive(),
    location: z.enum(Object.values(Location) as [string, ...string[]], {
      required_error: 'location is require',
    }),
    breed: z.enum(Object.values(Breed) as [string, ...string[]], {
      required_error: 'breed is require',
    }),
    weight: z
      .number({
        required_error: 'weight is require',
      })
      .positive(),
    label: z
      .enum(Object.values(Label) as [string, ...string[]])
      .default(Label.ForSale),
    category: z.enum(Object.values(Category) as [string, ...string[]], {
      required_error: 'category is require',
    }),
    seller: z.string(),
  }),
});

// export const updateCowsZodSchema = z
//   .object({
//     body: z.object({
//       title: z
//         .enum([...academicSemesterTitle] as [string, ...string[]], {
//           required_error: 'Tittle is required',
//         })
//         .optional(),
//       year: z
//         .string({
//           required_error: 'Year is require',
//         })
//         .optional(),
//       code: z
//         .enum([...academicSemesterCode] as [string, ...string[]])
//         .optional(),
//       startMonth: z
//         .enum([...academicSemesterMonth] as [string, ...string[]], {
//           required_error: 'start Month is require',
//         })
//         .optional(),
//       endMonth: z
//         .enum([...academicSemesterMonth] as [string, ...string[]], {
//           required_error: 'end Month is require',
//         })
//         .optional(),
//     }),
//   })
//   .refine(
//     data =>
//       (data.body.title && data.body.code) ||
//       (!data.body.title && !data.body.code),
//     {
//       message: 'Either Provide both currect format or give other value',
//     }
//   );
export const CowsValidation = {
  createCowsZodSchema,
};
