import { model, Schema } from "mongoose";
import { TRoom } from "./room.interface";

const roomSchema = new Schema<TRoom>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  facilities: {
    type: [String],
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

export const Room = model<TRoom>("Room", roomSchema);
