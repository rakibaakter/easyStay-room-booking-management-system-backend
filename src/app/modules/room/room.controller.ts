import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomServices } from "./room.service";

const createRoom = catchAsync(async(req, res)=>{
    const {room : roomData} = req.body;
    const result = await roomServices.createRoomIntoDB(roomData)

    // send response
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : "Room created successfully!",
        data : result
    } )
})

const getAllRoom = catchAsync(async(req, res)=>{
    const result = await roomServices.getAllRoomFromDB()

    // send response
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : "Rooms are retrived successfully!",
        data : result
    } )
})

const getRoomById = catchAsync(async(req, res)=>{
    const result = await roomServices.getSingleRoomByIdFromDB(req.params.id)

    // send response
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : "Room retrived successfully!",
        data : result
    } )
})




export const roomControllers = {
    createRoom,
    getAllRoom,
    getRoomById
}