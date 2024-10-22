import { Types } from "mongoose";

// Define the Booking interface
export interface TBooking {
  user: Types.ObjectId;
  room: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  status: "confirmed" | "pending" | "cancelled";
}

export type TDecodedUser = {
  userEmail: string;
  role: string;
  id: string;
};
