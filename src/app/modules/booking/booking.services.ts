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
      // check room existence
      const requestedRoom = await Room.findById(payload.room).session(session);

      if (!requestedRoom || requestedRoom.status !== "available") {
        throw new AppError(404, "This room is not available");
      }
      requestedRoom.status = "unavailable";
      await requestedRoom.save(); //update room status on room collection

      const dataForDB = { ...payload, user: user.id };
      const result = await Booking.create([dataForDB], { session });
      return {
        statusCode: 200,
        success: true,
        message: "Your booking has confirmed",
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
    // throw new AppError(500, "Internal Server Error");
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
