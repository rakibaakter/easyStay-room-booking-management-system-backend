import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    booking: z.object({
      //   user: z.string().min(1, { message: "User ID is required" }),
      room: z.string().min(1, { message: "Room ID is required" }),
      checkInDate: z.string({
        required_error: "Check-in date is required",
      }),
      checkOutDate: z.string({
        required_error: "Check-out date is required",
      }),
      // .refine(
      //   (checkOutDate, context) => {
      //     const { checkInDate } = context.parent;
      //     return checkInDate < checkOutDate;
      //   },
      //   { message: "Check-out date must be after check-in date" }
      // ),
      status: z.enum(["confirmed", "pending", "cancelled"]).default("pending"),
    }),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
};
