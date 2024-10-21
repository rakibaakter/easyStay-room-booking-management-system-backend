

import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


// call catchAsyc funtion for handle try catch in every controller
const createUser = catchAsync(async(req, res )=>{

    const userData= req.body 
    const result = await userServices.createUserIntoDB(userData);


    // send response
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : "User created successfully!",
        data : result
    } )
    
})

const getUserById = catchAsync(async(req, res)=>{

    
    const result =await userServices.getUserByIdfromDB(req.params.id);

     // send response
     sendResponse(res,{
        statusCode : 200,
        success : true,
        message : "User retrive successfully!",
        data : result
    } )

})

export const userControllers = {
    createUser,
    getUserById
}