import { Router } from "express";
import { createUserController, listAllUsers, listUserOnlineInfo, recoverUser, softDelete, updateInfoUser } from "../controllers/users.controllers";
import { createUserSchema, updateSchema } from "../schemas/users.schemas";
import ensureDataIsValid from "../middlewares/ensureDataValid.middleware"
import ensureTokenIsValid from "../middlewares/ensudeTokenIsValid.middlewares"
import ensureIsAdmin from "../middlewares/ensureUserIsAdmin.middlewares"
import emailALreadyExist from "../middlewares/ensureEmailAlreadyExist.middleweres"
import verifyAdminOrOwner from "../middlewares/ensureUserAdminOrNoCanChange.middlewares"


const userRoutes: Router = Router()

userRoutes.post("",ensureDataIsValid(createUserSchema),emailALreadyExist, createUserController)
userRoutes.get("",ensureTokenIsValid,ensureIsAdmin,listAllUsers)
userRoutes.get("/profile",ensureTokenIsValid,listUserOnlineInfo)
userRoutes.delete("/:id",ensureTokenIsValid,verifyAdminOrOwner,softDelete)
userRoutes.patch("/:id",ensureTokenIsValid,verifyAdminOrOwner,ensureDataIsValid(updateSchema),emailALreadyExist,updateInfoUser)
userRoutes.put("/:id/recover",ensureTokenIsValid,ensureIsAdmin,recoverUser)

export default userRoutes