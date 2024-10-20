import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';


const auth = (...requiredRoles : TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }
     // checking if the given token is valid
      jwt.verify(
        token,
        config.jwtAccessToken as string, function(err, decoded){
            if(err){
                throw new AppError(401, 'You are not authorized!');
            }

            // role based authentication
            const role = (decoded as JwtPayload).role;
            if(requiredRoles && !requiredRoles.includes(role)){
                throw new AppError(401, 'You are not authorized!');
            }

            req.user = decoded as JwtPayload;


            next();
        });

  })
};

export default auth;