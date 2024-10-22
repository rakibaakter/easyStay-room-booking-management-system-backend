import { TUser } from "./../users/user.interface";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TBooking, TDecodedUser } from "./booking.interface";
import Booking from "./booking.model";
import { startSession } from "mongoose";
import { Room } from "../room/room.model";



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
const createBookingIntoDB = async (user: TDecodedUser, payload: TBooking) => {
  try {
    const session = await startSession();
    return await session.withTransaction(async () => {

      // Check if the same user has already requested the same room for the same time period
      const userBookingConflict = await Booking.findOne({
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
        throw new AppError(409, "You have already requested a booking for this room during the selected time period.");
      }

      // Check if there are any conflicting confirmed bookings from other users
      const conflictingBooking = await Booking.findOne({
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
        throw new AppError(409, "This room is already booked during the requested time.");
      }

      // Room status remains available for other requests until an admin confirms the booking
      const dataForDB = { ...payload, user: user.id, status: "pending" };
      const result = await Booking.create([dataForDB], { session });

      return {
        statusCode: 200,
        success: true,
        message: "Your booking request has been submitted for approval.",
        data: result,
      };
    });
  } catch (error: any) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    return {
      statusCode,
      success: false,
      message: error.message || "Something Went Wrong",
      data: null,
    };
  }
};

// get all bookings from DB
const getAllBookingFromDB = async () => {
  try {
    const result = await Booking.find().populate("user room");

    if (!result.length) {
      throw new AppError(404, "No bookings found!");
    }

    return {
      statusCode: 200,
      success: true,
      message: "Bookings are retrieved successfully!",
      data: result,
    };
  } catch (error: any) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    return {
      statusCode,
      success: false,
      message: error.message || "Something Went Wrong",
      data: null,
    };
  }
};

// get user specific bookings
const getMyBookingsfromDB = async (user: TDecodedUser) => {
  try {
    const result = await Booking.find({ user: user.id }).populate("user room");
    if (!result.length) {
      throw new AppError(404, "No bookings found!");
    }

    return {
      statusCode: 200,
      success: true,
      message: "Your Bookings are retrieved successfully!",
      data: result,
    };
  } catch (error: any) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    return {
      statusCode,
      success: false,
      message: error.message || "Something Went Wrong",
      data: null,
    };
  }
};

// get single booking by its id
const getSingleBookingByIdFromDB = async (id: string) => {
  const result = await Booking.findById(id);
  return result;
};

// update booking

// delete single booking by its id
const deleteSingleBookingByIdFromDB = async (id: string) => {
  try {
    const session = await startSession();
    return await session.withTransaction(async () => {
      const result = await Booking.findByIdAndDelete(id).session(session);

      // update room status to available
      const updatedRoomStatus = await Room.findByIdAndUpdate(result?.room, {
        status: "available",
      }).session(session);

      return result;
    });
  } catch (error: any) {
    throw new AppError(500, "Something went wrong");
  }
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingsfromDB,
  getSingleBookingByIdFromDB,
  deleteSingleBookingByIdFromDB,
};
