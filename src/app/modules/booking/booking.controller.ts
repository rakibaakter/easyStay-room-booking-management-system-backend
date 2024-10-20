// call catchAsyc funtion for handle try catch in every controller

import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TDecodedUser } from "./booking.interface";
import { bookingServices } from "./booking.services";

// for post api
const createBooking = catchAsync(async (req, res) => {
  const { booking } = req.body;
  const result = await bookingServices.createBookingIntoDB(
    req.user as TDecodedUser,
    booking
  );

  // send response
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

// for get all booking
const getAllBooking = catchAsync(async (req, res) => {
  //   const query = req.query;

  const result = await bookingServices.getAllBookingFromDB();

  // send response
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

// for get all
const getUserBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getMyBookingsfromDB(
    req.user as TDecodedUser
  );

  // send response
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

// for single get api
const getBookingById = catchAsync(async (req, res) => {
  const result = await bookingServices.getSingleBookingByIdFromDB(
    req.params.id
  );

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking info retrived successfully!",
    data: result,
  });
});

// for delete api
const deleteBookingById = catchAsync(async (req, res) => {
  const result = await bookingServices.deleteSingleBookingByIdFromDB(
    req.params.id
  );

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking deleted successfully!",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBooking,
  getUserBookings,
  getBookingById,
  deleteBookingById,
};
