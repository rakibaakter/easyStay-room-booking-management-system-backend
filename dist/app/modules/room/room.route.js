"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constant_1 = require("../users/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const router = express_1.default.Router();
// post room to the database
router.post("/create-room", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(room_validation_1.roomValidations.createRoomValiadtionschema), room_controller_1.roomControllers.createRoom);
// get all room
router.get("/", room_controller_1.roomControllers.getAllRoom);
// get single room by id
router.get("/:id", room_controller_1.roomControllers.getRoomById);
// update by admin
router.patch("/id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(room_validation_1.roomValidations.updateRoomValiadtionschema), room_controller_1.roomControllers.updateRoomById);
// delete room by id
router.delete("/:id", room_controller_1.roomControllers.deletRoomById);
exports.RoomRoutes = router;
