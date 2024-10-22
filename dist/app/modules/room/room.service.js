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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomServices = void 0;
const room_model_1 = require("./room.model");
// post data to room collection into DB
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.create(payload);
    return result;
});
// get all room from DB
const getAllRoomFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.find();
    return result;
});
// get single room by its id
const getSingleRoomByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
// update room by admin
const updateRoomByIdIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedDoc = payload;
    const result = yield room_model_1.Room.findByIdAndUpdate(id, updatedDoc);
    return result;
});
// delete single room by its id
const deletSingleRoomByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndDelete(id);
    return result;
});
exports.roomServices = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomByIdFromDB,
    updateRoomByIdIntoDB,
    deletSingleRoomByIdFromDB,
};
