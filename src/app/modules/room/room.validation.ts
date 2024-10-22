import { z } from "zod";

const createRoomValiadtionschema = z.object({
  body: z.object({
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
});

const updateRoomValiadtionschema = z.object({
  body: z.object({
      title: z
        .string()
        .min(1, { message: "Title is required" })
        .trim()
        .optional(),
      rent: z
        .number()
        .min(0, { message: "Rent must be a positive number" })
        .nonnegative()
        .optional(),
      facilities: z
        .array(
          z.string().min(1, { message: "Facility must be a non-empty string" })
        )
        .min(1, { message: "At least one facility is required" })
        .optional(),
      picture: z
        .string()
        .url({ message: "Picture must be a valid URL" })
        .optional(),
      details: z
        .string()
        .min(1, { message: "Detail is required" })
        .trim()
        .optional(),
  }),
});

export const roomValidations = {
  createRoomValiadtionschema,
  updateRoomValiadtionschema,
};
