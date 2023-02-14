import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";

const userRoutes: Router = Router()

userRoutes.post("", createUserController)

export default userRoutes