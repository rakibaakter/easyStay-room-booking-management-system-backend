import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => /^[A-Z]/.test(value), {
        message: "First Name must start with a capital letter",
      }),
    lastName: z.string().min(1).max(20).refine((value) => /^[A-Z]/.test(value), {
      message: "Last Name must start with a capital letter",
    }),
  });

const createUserValidationSchema = z.object({
    body : z.object({
        name :userNameValidationSchema,
        email : z.string().email(),
        password: z
        .string({
          invalid_type_error: "Password must be a string",
        }).min(6, { message: "Password must have atleast 6 characters" })
        .max(20, { message: "Password can not be more than 20 characters" })
        .optional(),
    })
})

export const userValidations = {
    createUserValidationSchema
}