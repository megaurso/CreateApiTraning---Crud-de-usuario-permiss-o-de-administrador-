import { QueryResult } from "pg";
import { createUserSchema, returnSchemaAllUserWithOutPassword, returnUserSchema, returnUserSchemaWithOutPassword, updateSchema } from "../schemas/users.schemas"
import { z } from "zod"
 

type IUserRequest = z.infer<typeof createUserSchema>

type IUser = z.infer<typeof returnUserSchema>

type UserWithOutPassword = z.infer<typeof returnUserSchemaWithOutPassword>

type UserResultArray = z.infer<typeof returnSchemaAllUserWithOutPassword>
type UserUpdateResult = z.infer<typeof updateSchema>
type UserResult = QueryResult<UserWithOutPassword>
type UserResultWithPassword = QueryResult<IUser>

export{
    IUserRequest,
    IUser,
    UserWithOutPassword,
    UserResult,
    UserResultWithPassword,
    UserResultArray,
    UserUpdateResult
}