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