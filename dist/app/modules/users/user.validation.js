"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: "First Name must start with a capital letter",
    }),
    lastName: zod_1.z.string().min(1).max(20).refine((value) => /^[A-Z]/.test(value), {
        message: "Last Name must start with a capital letter",
    }),
});
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: userNameValidationSchema,
        email: zod_1.z.string().email(),
        password: zod_1.z
            .string({
            invalid_type_error: "Password must be a string",
        }).min(6, { message: "Password must have atleast 6 characters" })
            .max(20, { message: "Password can not be more than 20 characters" })
            .optional(),
    })
});
exports.userValidations = {
    createUserValidationSchema
};
