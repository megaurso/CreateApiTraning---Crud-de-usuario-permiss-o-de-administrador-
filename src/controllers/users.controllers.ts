import { Request, Response } from "express";
import createUsersServices from "../services/users/createUserService";
import { IUserRequest } from "../interfaces/users.interfaces";


const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;
  const newUser = await createUsersServices(userData);
  return res.status(201).json(newUser);
};

export { createUserController };
