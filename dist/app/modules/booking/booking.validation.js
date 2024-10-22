"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        //   user: z.string().min(1, { message: "User ID is required" }),
        room: zod_1.z.string().min(1, { message: "Room ID is required" }),
        checkInDate: zod_1.z.string({
            required_error: "Check-in date is required",
        }),
        checkOutDate: zod_1.z.string({
            required_error: "Check-out date is required",
        }),
        // .refine(
        //   (checkOutDate, context) => {
        //     const { checkInDate } = context.parent;
        //     return checkInDate < checkOutDate;
        //   },
        //   { message: "Check-out date must be after check-in date" }
        // ),
        status: zod_1.z.enum(["confirmed", "pending", "cancelled"]).default("pending"),
    }),
});
exports.bookingValidations = {
    createBookingValidationSchema,
};
