import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  IUserRequest,
  UserResult,
  UserWithOutPassword,
} from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";

const createUsersServices = async (
  userData: IUserRequest
): Promise<UserWithOutPassword> => {
  const queryStringUserExist: string = `
        SELECT 
            *
        FROM 
            users
        where 
            email = $1
    `;

  const queryConfigUserExist: QueryConfig = {
    text: queryStringUserExist,
    values: [userData.email],
  };

  const queryResultExist = await client.query(queryConfigUserExist);

  if (queryResultExist.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  const queryString: string = format(
    `
        INSERT INTO
            users(%I)
        VALUES(%L)
        RETURNING id,name,email,admin,active;
    `,
    Object.keys(userData),
    Object.values(userData)
  );

  const queryResult: UserResult = await client.query(queryString);

  return queryResult.rows[0];
};

export default createUsersServices;
