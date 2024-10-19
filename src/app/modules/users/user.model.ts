import { model, Schema } from "mongoose";
import { TUser, TUserName } from "./user.interface";


// schema for name convention
const userNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      maxlength: [20, "Name can not be more than 20 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
      maxlength: [20, "Name can not be more than 20 characters"],
    },
  });

//   full user schema for model
const userSchema =   new Schema<TUser>({
    name : {type : userNameSchema, required : [true, 'Name is required' ]},
    email : {type : String, required : [true, 'Name is required' ], unique : true},
    password : {type : String, required : [true, 'Password is required' ]},
})

export const User = model<TUser>("User", userSchema)