import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async(req : Request, res : Response )=>{

    const result = await userServices.createUserIntoDB(req.body);

    res.status(200).json({
        success : true,
        message : "User created successfully!",
        data : result
    })
}

export const userControllers = {
    createUser
}