import bcrypt  from 'bcrypt';
import { model, Schema } from "mongoose";
import { TUser, TUserName } from "./user.interface";
import config from "../../config";


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
    role : {type : String, enum : ["admin" , 'user'], default: "user"},
}, {
    toJSON : {
        virtuals : true
    }
})


// virtual for creating full name
userSchema.virtual('fullName').get(function () {
    return `${this.name.firstName +" " + this.name.lastName}`;
  });


  // middlewares | hook pre for save | encryption on passward
userSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcryptSaltRound)
    );
    next();
  });
  
  // post save middleware / hook |hide password from DB
  userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
  });

export const User = model<TUser>("User", userSchema)