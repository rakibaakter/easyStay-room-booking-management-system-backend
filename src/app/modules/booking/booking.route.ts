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
// get all bookings
router.get("/", auth(USER_ROLE.admin), bookingControllers.getAllBooking);
// get user specific bookings
router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  bookingControllers.getUserBookings
);
// get single bookings by id
router.get("/:id", bookingControllers.getBookingById);
// delete bookings by id
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  bookingControllers.deleteBookingById
);

export const BookingRoutes = router;
