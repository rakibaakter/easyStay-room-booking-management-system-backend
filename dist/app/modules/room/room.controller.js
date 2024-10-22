"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const room_service_1 = require("./room.service");
// call catchAsyc funtion for handle try catch in every controller
// for post api
const createRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room: roomData } = req.body;
    const result = yield room_service_1.roomServices.createRoomIntoDB(roomData);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room created successfully!",
        data: result,
    });
}));
// for get all api
const getAllRoom = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("token from client", req.headers.authorization);
    const result = yield room_service_1.roomServices.getAllRoomFromDB();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Rooms are retrived successfully!",
        data: result,
    });
}));
// for single get api
const getRoomById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomServices.getSingleRoomByIdFromDB(req.params.id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room retrived successfully!",
        data: result,
    });
}));
// for update room
const updateRoomById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield room_service_1.roomServices.updateRoomByIdIntoDB(req.params.id, payload);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room retrived successfully!",
        data: result,
    });
}));
// for delete api
const deletRoomById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.roomServices.deletSingleRoomByIdFromDB(req.params.id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Room deleted successfully!",
        data: result,
    });
}));
exports.roomControllers = {
    createRoom,
    getAllRoom,
    getRoomById,
    updateRoomById,
    deletRoomById,
};
