import { USER_ROLE } from "./user.constant";

export type TUserName = {
    firstName : string;
    lastName : string
}

export type TUser = {
    name : TUserName;
    email : string;
    password : string;
    role : "admin" | "user";
}

export type TUserRole = keyof typeof USER_ROLE;