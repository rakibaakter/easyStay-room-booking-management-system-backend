"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
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
const Booking = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = Booking;
