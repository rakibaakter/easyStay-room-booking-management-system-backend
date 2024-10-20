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


export const roomControllers = {
    createRoom
}