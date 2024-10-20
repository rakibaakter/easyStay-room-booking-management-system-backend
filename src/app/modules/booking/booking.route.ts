import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidations } from "./booking.validation";
import { bookingControllers } from "./booking.controller";

const router = express.Router();

// post room to the database
router.post(
  "/create-booking",
  auth(USER_ROLE.user),
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking
);
// get all room
router.get("/", bookingControllers.getAllBooking);
// get single room by id
router.get("/:id", bookingControllers.getBookingById);
// delete room by id
router.delete("/:id", bookingControllers.deleteBookingById);

export const BookingRoutes = router;
