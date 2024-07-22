import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import bcrypt from "bcrypt";




export const getAuthUser: RequestHandler = async (req, res, next) => {
 const authUserId = req.session.userId;
    try {
        if (!authUserId) {
        throw createHttpError(401, "USER Not authenticated");
        }

        const user = await userModel.findById(authUserId).select("+email").exec();
        res.status(200).json(user);
         } catch (err) {
        next(err);
         }
        

}





interface SignUpBody {
    userName?: string;
    email?: string;
    password?: string;

    }


export const signUp :RequestHandler<unknown,unknown,SignUpBody,unknown> = async (req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email;
    const password = req.body.password
  try {
    if (!email || !password || !userName) {
      throw createHttpError(400, "Missing required fields");
    }   
    const existingUser  = await userModel.findOne({ userName :userName }).exec();
    
    if (existingUser) {
      throw createHttpError(409, "User already exists");
    }

    const existingEmail = await userModel.findOne ({ email : email}).exec(); 
 
    if (existingEmail) {
      throw createHttpError(409, "Email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        email : email,
        password : passwordHash,
        userName : userName
    });

    req.session.userId = newUser._id;


     res.status(201).json(await newUser.save());

  } catch (err) {
    next(err);
  }
}


interface LoginBody {
    userName?: string;
    password?: string;
  }


export const login :RequestHandler<unknown,unknown,LoginBody,unknown> = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    try {
        if (!userName || !password) {
            throw createHttpError(400, "Missing required fields");
        }
    
        const user = await userModel.findOne({ userName: userName }).select("+password +email").exec();
    
        if (!user) {
            throw createHttpError(401, "Invalid email or password");
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid email or password");
        }
    
        req.session.userId = user._id;
    
        res.status(201).json(user);
        } catch (err) {
        next(err);
    }
}



export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie("sid");
        res.status(200).json({ message: "Logged out" });
    });
}; 