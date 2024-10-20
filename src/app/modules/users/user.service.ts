import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload : TUser)=>{
    // by default role assigned as user
    payload.role = 'user';
    
    const result = await User.create(payload);

    return result;
}

const getUserByIdfromDB = async(id : string )=>{
    

    const result = await User.findById(id);
    
    
    return result;
}

export const userServices = {
    createUserIntoDB,
    getUserByIdfromDB
}