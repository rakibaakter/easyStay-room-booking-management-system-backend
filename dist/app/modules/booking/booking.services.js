"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const booking_model_1 = __importDefault(require("./booking.model"));
const mongoose_1 = require("mongoose");
const room_model_1 = require("../room/room.model");
/* current date 21 oct
-> an user booked a room for 25-27 oct
-> another user request same room for 22-24 ----it will be proceed
-> if a new user requesting for the same room for 22-25 or any date from the first booked user date range --- it will be declined

-> if an user requesting for the same room for any bookings of the room checkout date as the user's checkin date


*/
// preventing duplicate booking
/*
-> an user can not send request for same room for same date he/she already requested onece
->


*/
// post data to booking collection into DB
const createBookingIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield (0, mongoose_1.startSession)();
        return yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            // Check if the same user has already requested the same room for the same time period
            const userBookingConflict = yield booking_model_1.default.findOne({
                user: user.id,
                room: payload.room,
                status: { $in: ["pending", "confirmed"] },
                $or: [
                    {
                        checkInDate: { $lte: payload.checkOutDate },
                        checkOutDate: { $gte: payload.checkInDate }
                    },
                ],
            }).session(session);
            if (userBookingConflict) {
                throw new AppError_1.default(409, "You have already requested a booking for this room during the selected time period.");
            }
            // Check if there are any conflicting confirmed bookings from other users
            const conflictingBooking = yield booking_model_1.default.findOne({
                room: payload.room,
                status: "confirmed",
                $or: [
                    {
                        checkInDate: { $lte: payload.checkOutDate },
                        checkOutDate: { $gte: payload.checkInDate }
                    },
                ],
            }).session(session);
            if (conflictingBooking) {
                throw new AppError_1.default(409, "This room is already booked during the requested time.");
            }
            // Room status remains available for other requests until an admin confirms the booking
            const dataForDB = Object.assign(Object.assign({}, payload), { user: user.id, status: "pending" });
            const result = yield booking_model_1.default.create([dataForDB], { session });
            return {
                statusCode: 200,
                success: true,
                message: "Your booking request has been submitted for approval.",
                data: result,
            };
        }));
    }
    catch (error) {
        const statusCode = error instanceof AppError_1.default ? error.statusCode : 500;
        return {
            statusCode,
            success: false,
            message: error.message || "Something Went Wrong",
            data: null,
        };
    }
});
// get all bookings from DB
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_model_1.default.find().populate("user room");
        if (!result.length) {
            throw new AppError_1.default(404, "No bookings found!");
        }
        return {
            statusCode: 200,
            success: true,
            message: "Bookings are retrieved successfully!",
            data: result,
        };
    }
    catch (error) {
        const statusCode = error instanceof AppError_1.default ? error.statusCode : 500;
        return {
            statusCode,
            success: false,
            message: error.message || "Something Went Wrong",
            data: null,
        };
    }
});
// get user specific bookings
const getMyBookingsfromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_model_1.default.find({ user: user.id }).populate("user room");
        if (!result.length) {
            throw new AppError_1.default(404, "No bookings found!");
        }
        return {
            statusCode: 200,
            success: true,
            message: "Your Bookings are retrieved successfully!",
            data: result,
        };
    }
    catch (error) {
        const statusCode = error instanceof AppError_1.default ? error.statusCode : 500;
        return {
            statusCode,
            success: false,
            message: error.message || "Something Went Wrong",
            data: null,
        };
    }
});
// get single booking by its id
const getSingleBookingByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findById(id);
    return result;
});
// update booking
// delete single booking by its id
const deleteSingleBookingByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield (0, mongoose_1.startSession)();
        return yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield booking_model_1.default.findByIdAndDelete(id).session(session);
            // update room status to available
            const updatedRoomStatus = yield room_model_1.Room.findByIdAndUpdate(result === null || result === void 0 ? void 0 : result.room, {
                status: "available",
            }).session(session);
            return result;
        }));
    }
    catch (error) {
        throw new AppError_1.default(500, "Something went wrong");
    }
});
exports.bookingServices = {
    createBookingIntoDB,
    getAllBookingFromDB,
    getMyBookingsfromDB,
    getSingleBookingByIdFromDB,
    deleteSingleBookingByIdFromDB,
};
