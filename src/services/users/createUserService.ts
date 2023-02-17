import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  IUserRequest,
  UserResult,
  UserResultArray,
  UserWithOutPassword,
} from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import {
  returnSchemaAllUserWithOutPassword,
  returnUserSchemaWithOutPassword,
} from "../../schemas/users.schemas";

const createUsersServices = async (
  userData: IUserRequest
): Promise<UserWithOutPassword> => {
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

const listUsersService = async (): Promise<UserResultArray> => {
  const queryString = `
    SELECT 
      *
    FROM
      users;
  `;
  const queryResult: UserResult = await client.query(queryString);

  const newQuery = returnSchemaAllUserWithOutPassword.parse(queryResult.rows);

  return newQuery;
};

const listUserInfoService = async (
  userId: number
): Promise<UserWithOutPassword> => {
  const queryString: string = `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  return returnUserSchemaWithOutPassword.parse(queryResult.rows[0]);
};

export { createUsersServices, listUsersService, listUserInfoService };
