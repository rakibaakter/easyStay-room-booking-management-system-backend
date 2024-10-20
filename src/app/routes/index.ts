import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { RoomRoutes } from "../modules/room/room.route";

const router = Router();

const moduleRoutes = [
    {
        path : "/users",
        route : UserRoutes
    },
    {
        path : "/auth",
        route : AuthRoutes
    }
    ,
    {
        path : "/rooms",
        route : RoomRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;