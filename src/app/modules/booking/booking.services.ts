import { TUser } from "./../users/user.interface";
import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TBooking, TDecodedUser } from "./booking.interface";
import Booking from "./booking.model";

// post data to booking collection into DB
const createBookingIntoDB = async (user: TDecodedUser, payload: TBooking) => {
  const dataForDB = { ...payload, user: user.id };
  console.log(dataForDB);
  const result = await Booking.create(dataForDB);
  return result;
};

// get all bookings from DB
const getAllBookingFromDB = async (query: Record<string, any>) => {
  console.log(query);

  let result;
  if (!Object.entries(query)) {
    // find all bookings
    result = await Booking.find().populate("user");
    return result;
  } else {
    const queryUser = await User.findOne(query); // findOne to get a single user
    if (!queryUser) {
      throw new AppError(404, `No user found for the given query`);
    }

    // query the bookings by the user's ObjectId
    result = await Booking.find({
      user: queryUser._id,
    }).populate("user");

    // If no bookings are found
    if (!result || result.length === 0) {
      throw new AppError(404, `No bookings found for the user`);
    }
    return result;
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
  getSingleBookingByIdFromDB,
  deleteSingleBookingByIdFromDB,
};
