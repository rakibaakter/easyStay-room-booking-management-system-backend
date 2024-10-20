import { TUser } from "./../users/user.interface";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TBooking, TDecodedUser } from "./booking.interface";
import Booking from "./booking.model";
import { startSession } from "mongoose";
import { Room } from "../room/room.model";

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

// delete single booking by its id
const deleteSingleBookingByIdFromDB = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingsfromDB,
  getSingleBookingByIdFromDB,
  deleteSingleBookingByIdFromDB,
};
