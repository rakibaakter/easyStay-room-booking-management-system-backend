"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomValidations = void 0;
const zod_1 = require("zod");
const createRoomValiadtionschema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.object({
            title: zod_1.z.string().min(1, { message: "Title is required" }).trim(),
            rent: zod_1.z
                .number()
                .min(0, { message: "Rent must be a positive number" })
                .nonnegative(),
            facilities: zod_1.z
                .array(zod_1.z.string().min(1, { message: "Facility must be a non-empty string" }))
                .min(1, { message: "At least one facility is required" }),
            picture: zod_1.z.string().url({ message: "Picture must be a valid URL" }),
            details: zod_1.z.string().min(1, { message: "Detail is required" }).trim(),
        }),
    }),
});
const updateRoomValiadtionschema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.object({
            title: zod_1.z
                .string()
                .min(1, { message: "Title is required" })
                .trim()
                .optional(),
            rent: zod_1.z
                .number()
                .min(0, { message: "Rent must be a positive number" })
                .nonnegative()
                .optional(),
            facilities: zod_1.z
                .array(zod_1.z.string().min(1, { message: "Facility must be a non-empty string" }))
                .min(1, { message: "At least one facility is required" })
                .optional(),
            picture: zod_1.z
                .string()
                .url({ message: "Picture must be a valid URL" })
                .optional(),
            details: zod_1.z
                .string()
                .min(1, { message: "Detail is required" })
                .trim()
                .optional(),
        }),
    }),
});
exports.roomValidations = {
    createRoomValiadtionschema,
    updateRoomValiadtionschema,
};
