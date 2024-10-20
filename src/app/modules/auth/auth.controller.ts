import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await authServices.loginUser(req.body);
    
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User is logged in succesfully!',
      data : result
    });
  });


  export const authControllers = {
    loginUser
  }