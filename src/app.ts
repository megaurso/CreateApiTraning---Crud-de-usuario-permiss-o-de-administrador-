import "express-async-errors"
import express, { Application } from "express";
import userRoutes from "./routers/users";
import { handleErrors } from "./errors";
const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use(handleErrors)

export default app;
