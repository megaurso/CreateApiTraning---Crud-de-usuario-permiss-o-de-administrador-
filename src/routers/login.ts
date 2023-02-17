import { Router } from "express";
import loginController from "../controllers/login.controllers"
import ensureDataIsValid from "../middlewares/ensureDataValid.middleware";
import createLoginSchemas from "../schemas/login.schemas"

const loginRoutes = Router()

loginRoutes.post("",ensureDataIsValid(createLoginSchemas) ,loginController)

export default loginRoutes