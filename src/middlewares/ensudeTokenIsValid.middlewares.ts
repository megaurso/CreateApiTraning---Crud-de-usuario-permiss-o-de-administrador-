import { NextFunction, Request,Response } from "express";
import { AppError } from "../errors";
import jwt  from "jsonwebtoken";

const ensureTokenIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1]
  jwt.verify(token, process.env.SRECET_KEY!, (error, decoded:any)=>{
    if(error){
      throw new AppError(error.message, 401)
    }
    req.user = {
      id: +decoded.sub,
      role: decoded.role
    }
    return next();
  })

};

export default ensureTokenIsValid;
