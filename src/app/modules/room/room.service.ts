import { TRoom } from "./room.interface";
import { Room } from "./room.model";

// upload room into db
const createRoomIntoDB = async(payload : TRoom)=>{
    const result = await Room.create(payload);
    return result
}

// get all room from db
const getAllRoomFromDB = async()=>{
    const result = await Room.find();
    return result;
}

// get single room from db by id
const getSingleRoomByIdFromDB = async(id : string)=>{
    const result = await Room.findById(id);
    return result;
}

export const roomServices = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomByIdFromDB
}