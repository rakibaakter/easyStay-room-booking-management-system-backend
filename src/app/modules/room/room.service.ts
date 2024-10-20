import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async(payload : TRoom)=>{
    const result = await Room.create(payload);
    return result
}

const getAllRoomFromDB = async()=>{
    const result = await Room.find();
    return result;
}

const getSingleRoomByIdFromDB = async(id : string)=>{
    const result = await Room.findById(id);
    return result;
}


export const roomServices = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomByIdFromDB
}