import { z } from "zod";

const createRoomValiadtionschema = z.object({
  body: z.object({
    room: z.object({
      title: z.string().min(1, { message: "Title is required" }).trim(),
      rent: z
        .number()
        .min(0, { message: "Rent must be a positive number" })
        .nonnegative(),
      facilities: z
        .array(
          z.string().min(1, { message: "Facility must be a non-empty string" })
        )
        .min(1, { message: "At least one facility is required" }),
      picture: z.string().url({ message: "Picture must be a valid URL" }),
      details: z.string().min(1, { message: "Detail is required" }).trim(),
    }),
  }),
});

export const roomValidations = {
  createRoomValiadtionschema,
};
