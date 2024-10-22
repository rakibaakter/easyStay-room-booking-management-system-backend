import { TRoom } from "./room.interface";
import { Room } from "./room.model";

// post data to room collection into DB
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

// get all room from DB
const getAllRoomFromDB = async () => {
  const result = await Room.find();
  return result;
};

// get single room by its id
const getSingleRoomByIdFromDB = async (id: string) => {
  console.log(id);
  
  const result = await Room.findById(id);
  console.log(result);
  return result;
};

// update room by admin
const updateRoomByIdIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const updatedDoc = payload;

  const result = await Room.findByIdAndUpdate(id, updatedDoc);

  return result;
};

// delete single room by its id
const deletSingleRoomByIdFromDB = async (id: string) => {
  const result = await Room.findByIdAndDelete(id);
  return result;
};

export const roomServices = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomByIdFromDB,
  updateRoomByIdIntoDB,
  deletSingleRoomByIdFromDB,
};
