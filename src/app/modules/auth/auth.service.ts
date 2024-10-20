import AppError from "../../error/AppError";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.findOne({email : payload.email});
  
    if (!user) {
      throw new AppError(404, "User not found");
    }
    
  
    //checking if the password is correct
    const isPasswordMatched =  await bcrypt.compare(payload?.password, user?.password);
  
    if (!isPasswordMatched){
      throw new AppError(403, "Incorrect password!")

    }  
  
    return {

    };
  };


  export const authServices = {
    loginUser
  }