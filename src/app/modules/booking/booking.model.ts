import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value: Date) {
    //     return this.checkInDate < value; // Ensures the checkOutDate is after checkInDate
    //   },
    //   message: "Check-out date must be after check-in date",
    // },
  },
  status: {
    type: String,
    enum: ["confirmed", "pending", "cancelled"],
    default: "pending",
  },
});

const Booking = model<TBooking>("Booking", bookingSchema);

export default Booking;
