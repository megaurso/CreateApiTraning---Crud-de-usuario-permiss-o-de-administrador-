import { Request, Response } from "express";
import {
  createUsersServices,
  listUsersService,
  listUserInfoService,
} from "../services/users/createUserService";
import { IUserRequest } from "../interfaces/users.interfaces";
import deleteUser from "../services/users/deleteUserService"
import changeUserService from "../services/users/changeUserService"
import recoverUserService from "../services/users/recoverUserService"

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;
  const newUser = await createUsersServices(userData);
  return res.status(201).json(newUser);
};

const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await listUsersService();

  return res.json(users);
};

const listUserOnlineInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = req.user.id;

  const user = await listUserInfoService(userId);

  return res.json(user);
};

const softDelete = async (req: Request, res: Response): Promise<Response> => {
  const userId:number = +req.params.id
  await deleteUser(userId)
  return res.status(204).send()
};

const updateInfoUser = async (req: Request, res: Response): Promise<Response> => {
  const userId:number = +req.params.id

  const user = await changeUserService(userId,req.body)

  return res.status(200).json(user)
}

const recoverUser = async (req: Request, res: Response): Promise<Response> =>{
  const userId:number = +req.params.id

  const user = await recoverUserService(userId)
  
  return res.status(200).json(user)
}

export { createUserController, listAllUsers, listUserOnlineInfo,softDelete,updateInfoUser,recoverUser };
