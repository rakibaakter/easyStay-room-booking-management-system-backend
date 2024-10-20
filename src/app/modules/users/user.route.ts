import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post('/create-user', validateRequest(userValidations.createUserValidationSchema),userControllers.createUser);
// router.post('/create-user',userControllers.createUser);

router.get("/:id", auth(USER_ROLE.user), userControllers.getUserById)
// router.get("/:id", userControllers.getUserById)



export const UserRoutes = router;