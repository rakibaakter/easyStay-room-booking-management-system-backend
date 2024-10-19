import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";

const router = express.Router();

router.post('/create-user', validateRequest(userValidations.createUserValidationSchema),userControllers.createUser);
// router.post('/create-user',userControllers.createUser);





export const UserRoutes = router;