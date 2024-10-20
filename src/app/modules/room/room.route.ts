import  express  from 'express'
import { USER_ROLE } from '../users/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { roomValidations } from './room.validation';
import { roomControllers } from './room.controller';

const router = express.Router();

router.post("/create-room",auth(USER_ROLE.admin),validateRequest(roomValidations.createRoomValiadtionschema), roomControllers.createRoom)


export const RoomRoutes = router