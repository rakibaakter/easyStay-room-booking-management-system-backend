"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../users/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
// post room to the database
router.post("/create-booking", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(booking_validation_1.bookingValidations.createBookingValidationSchema), booking_controller_1.bookingControllers.createBooking);
// get all bookings
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.getAllBooking);
// get user specific bookings
router.get("/my-bokings", (0, auth_1.default)(user_constant_1.USER_ROLE.user), booking_controller_1.bookingControllers.getUserBookings);
// get single bookings by id
router.get("/:id", booking_controller_1.bookingControllers.getBookingById);
// delete bookings by id
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), booking_controller_1.bookingControllers.deleteBookingById);
exports.BookingRoutes = router;
