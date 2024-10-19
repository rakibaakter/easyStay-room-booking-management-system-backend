import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req : Request, res : Response )=>{

    const {user : userData} = req.body 
    const result = await userServices.createUserIntoDB(userData);

    res.status(200).json({
        success : true,
        message : "User created successfully!",
        data : result
    })
}

export const userControllers = {
    createUser
}