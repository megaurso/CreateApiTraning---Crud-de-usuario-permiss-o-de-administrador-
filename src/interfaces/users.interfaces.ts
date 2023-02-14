import { QueryResult } from "pg";

interface IUserRequest {
  name: string;
  password: string;
  email: string;
  admin: boolean;
  active: boolean;
}

interface IUser extends IUserRequest{
    id:number
}

type UserWithOutPassword = Omit<IUser, "password">
type UserResult = QueryResult<UserWithOutPassword>

export{
    IUserRequest,
    IUser,
    UserWithOutPassword,
    UserResult
}