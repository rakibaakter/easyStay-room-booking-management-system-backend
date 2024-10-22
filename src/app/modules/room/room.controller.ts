import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { roomServices } from "./room.service";

// call catchAsyc funtion for handle try catch in every controller

// for post api
const createRoom = catchAsync(async (req, res) => {
  const { room: roomData } = req.body;
  const result = await roomServices.createRoomIntoDB(roomData);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room created successfully!",
    data: result,
  });
});

// for get all api
const getAllRoom = catchAsync(async (req, res) => {
  // console.log("token from client", req.headers.authorization);
  
  const result = await roomServices.getAllRoomFromDB();

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Rooms are retrived successfully!",
    data: result,
  });
});

// for single get api
const getRoomById = catchAsync(async (req, res) => {
  
  const result = await roomServices.getSingleRoomByIdFromDB(req.params.id);
  
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room retrived successfully!",
    data: result,
  });
});

// for update room
const updateRoomById = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await roomServices.updateRoomByIdIntoDB(
    req.params.id,
    payload
  );

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room retrived successfully!",
    data: result,
  });
});

// for delete api
const deletRoomById = catchAsync(async (req, res) => {
  const result = await roomServices.deletSingleRoomByIdFromDB(req.params.id);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Room deleted successfully!",
    data: result,
  });
});

export const roomControllers = {
  createRoom,
  getAllRoom,
  getRoomById,
  updateRoomById,
  deletRoomById,
};
