"use strict";
// call catchAsyc funtion for handle try catch in every controller
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
exports.bookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_services_1 = require("./booking.services");
// for post api
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = req.body;
    const result = yield booking_services_1.bookingServices.createBookingIntoDB(req.user, booking);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: result.statusCode,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}));
// for get all booking
const getAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const query = req.query;
    const result = yield booking_services_1.bookingServices.getAllBookingFromDB();
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: result.statusCode,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}));
// for get all
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.getMyBookingsfromDB(req.user);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: result.statusCode,
        success: result.success,
        message: result.message,
        data: result.data,
    });
}));
// for single get api
const getBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.getSingleBookingByIdFromDB(req.params.id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Booking info retrived successfully!",
        data: result,
    });
}));
// for delete api
const deleteBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_services_1.bookingServices.deleteSingleBookingByIdFromDB(req.params.id);
    // send response
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Booking deleted successfully!",
        data: result,
    });
}));
exports.bookingControllers = {
    createBooking,
    getAllBooking,
    getUserBookings,
    getBookingById,
    deleteBookingById,
};
