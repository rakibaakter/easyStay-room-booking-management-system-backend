import express from "express";
import { USER_ROLE } from "../users/user.constant";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { roomValidations } from "./room.validation";
import { roomControllers } from "./room.controller";

const router = express.Router();

// post room to the database
router.post(
  "/create-room",
  auth(USER_ROLE.admin),
  validateRequest(roomValidations.createRoomValiadtionschema),
  roomControllers.createRoom
);
// get all room
router.get("/", roomControllers.getAllRoom);
// get single room by id
router.get("/:id", roomControllers.getRoomById);
// delete room by id
router.delete("/:id", roomControllers.deletRoomById);

export const RoomRoutes = router;
